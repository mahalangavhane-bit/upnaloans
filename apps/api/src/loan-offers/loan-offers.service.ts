import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLoanOfferDto } from './dto/create-loan-offer.dto';

@Injectable()
export class LoanOffersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Calculate monthly EMI.
   *
   * @param amount Loan principal
   * @param interestRate Annual interest rate in percentage
   * @param tenure Loan tenure in months
   */
  calculateMonthlyEmi(
    amount: number,
    interestRate: number,
    tenure: number,
  ): number {
    const monthlyRate = interestRate / 12 / 100;

    // Zero-interest case
    if (monthlyRate === 0) {
      return amount / tenure;
    }

    const factor = Math.pow(
      1 + monthlyRate,
      tenure,
    );

    return (
      (amount * monthlyRate * factor) /
      (factor - 1)
    );
  }

  async createOffer(dto: CreateLoanOfferDto) {
    // 1. Check application exists
    const application =
      await this.prisma.application.findUnique({
        where: {
          id: dto.applicationId,
        },
      });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${dto.applicationId} not found`,
      );
    }

    // 2. Check lender exists
    const lender =
      await this.prisma.lender.findUnique({
        where: {
          id: dto.lenderId,
        },
      });

    if (!lender) {
      throw new NotFoundException(
        `Lender with ID ${dto.lenderId} not found`,
      );
    }

    // 3. Check product if provided
    if (dto.productId) {
      const product =
        await this.prisma.lenderProduct.findUnique({
          where: {
            id: dto.productId,
          },
        });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${dto.productId} not found`,
        );
      }

      if (product.lenderId !== dto.lenderId) {
        throw new NotFoundException(
          `Product does not belong to lender ${dto.lenderId}`,
        );
      }
    }

    // 4. Calculate monthly EMI
    const monthlyEmi = this.calculateMonthlyEmi(
      dto.amount,
      dto.interestRate,
      dto.tenure,
    );

    // 5. Create loan offer
    const offer =
      await this.prisma.loanOffer.create({
        data: {
          applicationId: dto.applicationId,
          lenderId: dto.lenderId,
          productId: dto.productId,

          status: 'GENERATED',

          amount: dto.amount,
          interestRate: dto.interestRate,
          tenure: dto.tenure,

          monthlyEmi,

          expiresAt: dto.expiresAt
            ? new Date(dto.expiresAt)
            : null,
        },

        include: {
          lender: true,
          product: true,
        },
      });

    return offer;
  }

  async getAllOffers() {
    return this.prisma.loanOffer.findMany({
      include: {
        lender: true,
        product: true,
        application: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOfferById(id: string) {
    const offer =
      await this.prisma.loanOffer.findUnique({
        where: {
          id,
        },
        include: {
          lender: true,
          product: true,
          application: true,
        },
      });

    if (!offer) {
      throw new NotFoundException(
        `Loan offer with ID ${id} not found`,
      );
    }

    return offer;
  }

  async presentOffer(id: string) {
    const offer =
      await this.prisma.loanOffer.findUnique({
        where: {
          id,
        },
      });

    if (!offer) {
      throw new NotFoundException(
        `Loan offer with ID ${id} not found`,
      );
    }

    if (offer.status !== 'GENERATED') {
      throw new ConflictException(
        'Only GENERATED offers can be presented',
      );
    }

    const result =
      await this.prisma.$transaction(async (tx) => {
        const updatedOffer =
          await tx.loanOffer.update({
            where: {
              id,
            },
            data: {
              status: 'PRESENTED',
            },
            include: {
              lender: true,
              product: true,
              application: true,
            },
          });

        await tx.application.update({
          where: {
            id: offer.applicationId,
          },
          data: {
            status: 'OFFER_PRESENTED',
          },
        });

        await tx.applicationStatusHistory.create({
          data: {
            applicationId: offer.applicationId,
            status: 'OFFER_PRESENTED',
          },
        });

        return updatedOffer;
      });

    return result;
  }

  async generateOffers(applicationId: string) {
    // 1. Check application exists
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

    // 2. Validate amount and tenure
    if (!application.amount || !application.tenure) {
      throw new ConflictException(
        'Application amount and tenure are required to generate offers',
      );
    }

    // 3. Get eligible lender products
    const eligibilityChecks =
      await this.prisma.eligibilityCheck.findMany({
        where: {
          applicationId,
          status: 'ELIGIBLE',
        },
        include: {
          lender: true,
          product: true,
        },
      });

    if (eligibilityChecks.length === 0) {
      throw new ConflictException(
        'No eligible lender products found for this application',
      );
    }

    // 4. Prevent duplicate offers
    const existingOffers =
      await this.prisma.loanOffer.count({
        where: {
          applicationId,
        },
      });

    if (existingOffers > 0) {
      throw new ConflictException(
        'Offers already exist for this application',
      );
    }

    const offers: any[] = [];

    // 5. Generate one offer per eligible lender product
    for (const check of eligibilityChecks) {
      if (!check.product) {
        continue;
      }

      const rules =
        await this.prisma.lenderRule.findMany({
          where: {
            lenderId: check.lenderId,
            productId: check.product.id,
            isActive: true,
          },
        });

      // 6. Find interest-rate rule
      const interestRule = rules.find(
        (rule) =>
          rule.ruleType === 'INTEREST_RATE',
      );

      let interestRate: number | null = null;

      if (interestRule) {
        const config =
          interestRule.ruleConfig as Record<
            string,
            unknown
          >;

        if (typeof config.rate === 'number') {
          interestRate = config.rate;
        }
      }

      // Skip lender if no interest-rate rule exists
      if (interestRate === null) {
        continue;
      }

      // 7. Prepare offer values
      const amount = Number(application.amount);
      const tenure = application.tenure;

      // 8. Calculate EMI
      const monthlyEmi =
        this.calculateMonthlyEmi(
          amount,
          interestRate,
          tenure,
        );

      // 9. Create offer
      const offer =
        await this.prisma.loanOffer.create({
          data: {
            applicationId,
            lenderId: check.lenderId,
            productId: check.product.id,

            status: 'GENERATED',

            amount,
            interestRate,
            tenure,
            monthlyEmi,
          },

          include: {
            lender: true,
            product: true,
          },
        });

      offers.push(offer);
    }

    // 10. Make sure at least one offer was generated
    if (offers.length === 0) {
      throw new ConflictException(
        'No eligible lender has an interest-rate rule configured',
      );
    }

    // 11. Update application state
    await this.prisma.$transaction(
      async (tx) => {
        await tx.application.update({
          where: {
            id: applicationId,
          },
          data: {
            status: 'LENDER_MATCHED',
          },
        });

        await tx.applicationStatusHistory.create({
          data: {
            applicationId,
            status: 'LENDER_MATCHED',
          },
        });
      },
    );

    return {
      applicationId,
      count: offers.length,
      offers,
    };
  }

  async selectOffer(id: string) {
    const offer =
      await this.prisma.loanOffer.findUnique({
        where: {
          id,
        },
      });

    if (!offer) {
      throw new NotFoundException(
        `Loan offer with ID ${id} not found`,
      );
    }

    if (offer.status !== 'PRESENTED') {
      throw new ConflictException(
        'Only PRESENTED offers can be selected',
      );
    }

    const result =
      await this.prisma.$transaction(async (tx) => {
        const updatedOffer =
          await tx.loanOffer.update({
            where: {
              id,
            },
            data: {
              status: 'SELECTED',
            },
            include: {
              lender: true,
              product: true,
              application: true,
            },
          });

        await tx.application.update({
          where: {
            id: offer.applicationId,
          },
          data: {
            status: 'CUSTOMER_SELECTED',
          },
        });

        await tx.applicationStatusHistory.create({
          data: {
            applicationId: offer.applicationId,
            status: 'CUSTOMER_SELECTED',
          },
        });

        return updatedOffer;
      });

    return result;
  }
}