import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { MatchLenderDto } from './dto/match-lender.dto';

@Injectable()
export class LenderMatchingService {
  constructor(private readonly prisma: PrismaService) {}

  async matchLenders(dto: MatchLenderDto) {
    // 1. Check customer exists
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: dto.customerId,
      },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${dto.customerId} not found`,
      );
    }
        // 2. Check application exists
    const application = await this.prisma.application.findUnique({
      where: {
        id: dto.applicationId,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${dto.applicationId} not found`,
      );
    }

    // 3. Check application belongs to customer
    if (application.customerId !== dto.customerId) {
      throw new NotFoundException(
        `Application does not belong to customer ${dto.customerId}`,
      );
    }

    // 4. Get active lender products + rules
    const products = await this.prisma.lenderProduct.findMany({
      where: {
        status: 'ACTIVE',
        lender: {
          status: 'ACTIVE',
        },
      },
      include: {
        lender: true,
        rules: {
          where: {
            isActive: true,
          },
        },
      },
    });

    const results: any[] = [];

    // 5. Evaluate every lender product
    for (const product of products) {
      const failedRules: string[] = [];
      const passedRules: string[] = [];

      // 6. Evaluate database rules
      for (const rule of product.rules) {
        const config = rule.ruleConfig as Record<string, any>;

        switch (rule.ruleType) {
        case 'CREDIT_SCORE':
    if (
      config.minimum !== undefined &&
      dto.creditScore < Number(config.minimum)
    ) {
      failedRules.push(
        `Credit score should be at least ${config.minimum}`,
      );
    } else {
      passedRules.push(rule.name);
    }
    break;

  case 'MIN_INCOME':
    if (
      config.minimum !== undefined &&
      dto.monthlyIncome < Number(config.minimum)
    ) {
      failedRules.push(
        `Minimum monthly income should be ${config.minimum}`,
      );
    } else {
      passedRules.push(rule.name);
    }
    break;

  case 'MAX_AMOUNT':
    if (
      config.maximum !== undefined &&
      dto.requestedAmount > Number(config.maximum)
    ) {
      failedRules.push(
        `Requested amount should not exceed ${config.maximum}`,
      );
    } else {
      passedRules.push(rule.name);
    }
    break;

  case 'INTEREST_RATE':
    // Used for offer generation, not eligibility matching.
    break;

  default:
    failedRules.push(
      `Unsupported rule type: ${rule.ruleType}`,
    );
  }
}

      // 7. Product amount limits
      if (
        product.minAmount &&
        dto.requestedAmount < Number(product.minAmount)
      ) {
        failedRules.push(
          `Requested amount should be at least ${product.minAmount}`,
        );
      }

      if (
        product.maxAmount &&
        dto.requestedAmount > Number(product.maxAmount)
      ) {
        failedRules.push(
          `Requested amount should not exceed ${product.maxAmount}`,
        );
      }

      // 8. Product tenure limits
      if (
        product.minTenure &&
        dto.tenureMonths < product.minTenure
      ) {
        failedRules.push(
          `Tenure should be at least ${product.minTenure} months`,
        );
      }

      if (
        product.maxTenure &&
        dto.tenureMonths > product.maxTenure
      ) {
        failedRules.push(
          `Tenure should not exceed ${product.maxTenure} months`,
        );
      }

      // 9. Calculate weighted matching score

let creditScoreScore = 0;
let incomeScore = 0;
let amountScore = 0;
let tenureScore = 0;

// Credit Score - 40%
if (dto.creditScore !== undefined) {
  const minimumCreditRule = product.rules.find(
    (rule) => rule.ruleType === 'CREDIT_SCORE',
  );

  if (minimumCreditRule) {
    const config = minimumCreditRule.ruleConfig as Record<string, any>;
    const minimum = Number(config.minimum);

    if (dto.creditScore >= minimum) {
      creditScoreScore = 40;
    }
  }
}

// Monthly Income - 30%
if (dto.monthlyIncome !== undefined) {
  const minimumIncomeRule = product.rules.find(
    (rule) => rule.ruleType === 'MIN_INCOME',
  );

  if (minimumIncomeRule) {
    const config = minimumIncomeRule.ruleConfig as Record<string, any>;
    const minimum = Number(config.minimum);

    if (dto.monthlyIncome >= minimum) {
      incomeScore = 30;
    }
  }
}

// Loan Amount - 20%
if (
  (!product.minAmount ||
    dto.requestedAmount >= Number(product.minAmount)) &&
  (!product.maxAmount ||
    dto.requestedAmount <= Number(product.maxAmount))
) {
  amountScore = 20;
}

// Tenure - 10%
if (
  (!product.minTenure ||
    dto.tenureMonths >= product.minTenure) &&
  (!product.maxTenure ||
    dto.tenureMonths <= product.maxTenure)
) {
  tenureScore = 10;
}

const matchScore =
  creditScoreScore +
  incomeScore +
  amountScore +
  tenureScore;

      // 10. Store result
      results.push({
        lender: {
          id: product.lender.id,
          name: product.lender.name,
          code: product.lender.code,
        },

        product: {
          id: product.id,
          name: product.name,
          code: product.code,
        },

        matched: failedRules.length === 0,

        matchScore,

        scoreBreakdown: {
          creditScore: creditScoreScore,
          monthlyIncome: incomeScore,
          loanAmount: amountScore,
          tenure: tenureScore,
      },

        passedRules,

        failedRules,
      });
    }

    // 11. Sort best matches first
    results.sort((a, b) => {
        if (a.matched !== b.matched) {
        return a.matched ? -1 : 1;
    }

        return b.matchScore - a.matchScore;
  });

    // 12. Separate matched products
    const matchedProducts = results.filter(
      (result) => result.matched,
    );

    // 13. Return complete matching response
    return {
      customerId: dto.customerId,
      loanType: dto.loanType,
      requestedAmount: dto.requestedAmount,
      tenureMonths: dto.tenureMonths,

      matchedProducts,

      allResults: results,

      count: matchedProducts.length,
    };
  }
}