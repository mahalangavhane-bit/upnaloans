import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CheckEligibilityDto } from './dto/check-eligibility.dto';

@Injectable()
export class EligibilityService {
  constructor(private readonly prisma: PrismaService) {}

  async checkEligibility(dto: CheckEligibilityDto) {
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

    // Make sure application belongs to customer
    if (application.customerId !== dto.customerId) {
      throw new NotFoundException(
        `Application does not belong to customer ${dto.customerId}`,
      );
    }

    // 3. Basic customer-level eligibility
    const customerReasons: string[] = [];

    if (dto.age < 21 || dto.age > 60) {
      customerReasons.push(
        'Age must be between 21 and 60',
      );
    }

    if (dto.requestedAmount <= 0) {
      customerReasons.push(
        'Requested loan amount must be greater than 0',
      );
    }

    if (dto.tenureMonths <= 0) {
      customerReasons.push(
        'Tenure must be greater than 0 months',
      );
    }

    // 4. Get active lender products and active rules
    const products =
      await this.prisma.lenderProduct.findMany({
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

    // 5. Check every lender product
    for (const product of products) {
      const passedRules: string[] = [];
      const failedRules: string[] = [];

      // Customer-level failures
      if (customerReasons.length > 0) {
        failedRules.push(...customerReasons);
      }

      // Only eligibility rules are evaluated here.
      // Pricing rules such as INTEREST_RATE are handled
      // by Loan Offer Engine.
      const eligibilityRules = product.rules.filter(
        (rule) =>
          rule.ruleType === 'CREDIT_SCORE' ||
          rule.ruleType === 'MIN_INCOME' ||
          rule.ruleType === 'MAX_AMOUNT',
      );

      // Evaluate eligibility rules
      for (const rule of eligibilityRules) {
        const config =
          rule.ruleConfig as Record<string, any>;

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

          default:
            // No action.
            // Non-eligibility rules are handled elsewhere.
            break;
        }
      }

      // 6. Product amount limits
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

      // 7. Product tenure limits
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

      // 8. Final eligibility
      const eligible = failedRules.length === 0;

      await this.prisma.eligibilityCheck.create({
        data: {
          applicationId: dto.applicationId,
          lenderId: product.lender.id,
          productId: product.id,

          status: eligible
            ? 'ELIGIBLE'
            : 'NOT_ELIGIBLE',

          ruleVersion:
            eligibilityRules.length > 0
              ? Math.max(
                  ...eligibilityRules.map(
                    (rule) => rule.version,
                  ),
                )
              : null,

          details: {
            loanType: dto.loanType,
            requestedAmount: dto.requestedAmount,
            tenureMonths: dto.tenureMonths,
            monthlyIncome: dto.monthlyIncome,
            employmentType: dto.employmentType,
            age: dto.age,
            creditScore: dto.creditScore,
            passedRules,
            failedRules,
          },

          failureReason:
            failedRules.length > 0
              ? failedRules.join('; ')
              : null,
        },
      });

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

        eligible,
        passedRules,
        failedRules,
      });
    }

    // 9. Sort eligible products first
    results.sort((a, b) => {
      if (a.eligible !== b.eligible) {
        return a.eligible ? -1 : 1;
      }

      return 0;
    });

    // 10. Get eligible products
    const eligibleProducts = results.filter(
      (result) => result.eligible,
    );

    // 11. Save application status + status history
    if (eligibleProducts.length > 0) {
      const currentApplication =
        await this.prisma.application.findUnique({
          where: {
            id: dto.applicationId,
          },
        });

      if (
        currentApplication &&
        currentApplication.status !== 'ELIGIBILITY_CHECK'
      ) {
        await this.prisma.$transaction(async (tx) => {
          await tx.application.update({
            where: {
              id: dto.applicationId,
            },
            data: {
              status: 'ELIGIBILITY_CHECK',
            },
          });

          await tx.applicationStatusHistory.create({
            data: {
              applicationId: dto.applicationId,
              status: 'ELIGIBILITY_CHECK',
            },
          });
        });
      }
    }

    // 12. Final response
    return {
      customerId: dto.customerId,
      loanType: dto.loanType,
      requestedAmount: dto.requestedAmount,
      tenureMonths: dto.tenureMonths,

      eligible: eligibleProducts.length > 0,

      eligibleProducts,

      allResults: results,

      count: eligibleProducts.length,
    };
  }

  async getEligibilityByApplication(
    applicationId: string,
  ) {
    const application =
      await this.prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${applicationId} not found`,
      );
    }

    return this.prisma.eligibilityCheck.findMany({
      where: {
        applicationId,
      },
      include: {
        lender: true,
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}