jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));
import { Test, TestingModule } from '@nestjs/testing';

import { EligibilityService } from './eligibility.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('EligibilityService', () => {
  let service: EligibilityService;

  const prismaMock = {
    customer: {
      findUnique: jest.fn(),
    },

    application: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },

    lenderProduct: {
      findMany: jest.fn(),
    },

    eligibilityCheck: {
      create: jest.fn(),
      findMany: jest.fn(),
    },

    applicationStatusHistory: {
      create: jest.fn(),
    },

    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaMock.$transaction.mockImplementation(
      async (callback) => callback(prismaMock),
    );

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          EligibilityService,
          {
            provide: PrismaService,
            useValue: prismaMock,
          },
        ],
      }).compile();

    service =
      module.get<EligibilityService>(
        EligibilityService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw when customer does not exist', async () => {
    prismaMock.customer.findUnique.mockResolvedValue(null);

    await expect(
      service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 500000,
        tenureMonths: 60,
        monthlyIncome: 50000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 750,
      }),
    ).rejects.toThrow(
      'Customer with ID customer-1 not found',
    );
  });

  it('should throw when application does not exist', async () => {
    prismaMock.customer.findUnique.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.application.findUnique.mockResolvedValue(null);

    await expect(
      service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 500000,
        tenureMonths: 60,
        monthlyIncome: 50000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 750,
      }),
    ).rejects.toThrow(
      'Application with ID application-1 not found',
    );
  });

  it('should reject application belonging to another customer', async () => {
    prismaMock.customer.findUnique.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.application.findUnique.mockResolvedValue({
      id: 'application-1',
      customerId: 'customer-2',
    });

    await expect(
      service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 500000,
        tenureMonths: 60,
        monthlyIncome: 50000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 750,
      }),
    ).rejects.toThrow(
      'Application does not belong to customer customer-1',
    );
  });

  it('should return eligible when all lender rules pass', async () => {
    prismaMock.customer.findUnique.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.application.findUnique
      .mockResolvedValueOnce({
        id: 'application-1',
        customerId: 'customer-1',
        status: 'LEAD',
      })
      .mockResolvedValueOnce({
        id: 'application-1',
        customerId: 'customer-1',
        status: 'LEAD',
      });

    prismaMock.lenderProduct.findMany.mockResolvedValue([
      {
        id: 'product-1',
        name: 'HDFC Personal Loan',
        code: 'HDFC_PERSONAL',
        minAmount: '50000',
        maxAmount: '2000000',
        minTenure: 12,
        maxTenure: 60,

        lender: {
          id: 'lender-1',
          name: 'HDFC Bank',
          code: 'HDFC',
        },

        rules: [
          {
            name: 'Minimum Credit Score',
            version: 1,
            ruleType: 'CREDIT_SCORE',
            ruleConfig: {
              minimum: 650,
            },
          },
          {
            name: 'Minimum Monthly Income',
            version: 1,
            ruleType: 'MIN_INCOME',
            ruleConfig: {
              minimum: 15000,
            },
          },
          {
            name: 'Maximum Loan Amount',
            version: 1,
            ruleType: 'MAX_AMOUNT',
            ruleConfig: {
              maximum: 2000000,
            },
          },
          {
            name: 'Interest Rate',
            version: 1,
            ruleType: 'INTEREST_RATE',
            ruleConfig: {
              rate: 10.75,
            },
          },
        ],
      },
    ]);

    prismaMock.eligibilityCheck.create.mockResolvedValue({
      id: 'eligibility-1',
    });

    prismaMock.application.update.mockResolvedValue({
      id: 'application-1',
      status: 'ELIGIBILITY_CHECK',
    });

    prismaMock.applicationStatusHistory.create.mockResolvedValue({
      id: 'history-1',
    });

    const result =
      await service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 500000,
        tenureMonths: 60,
        monthlyIncome: 50000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 750,
      });

    expect(result.eligible).toBe(true);
    expect(result.count).toBe(1);
    expect(result.eligibleProducts).toHaveLength(1);

    expect(
      result.eligibleProducts[0].lender.code,
    ).toBe('HDFC');

    expect(
      result.eligibleProducts[0].failedRules,
    ).toEqual([]);

    expect(
      result.eligibleProducts[0].passedRules,
    ).toEqual([
      'Minimum Credit Score',
      'Minimum Monthly Income',
      'Maximum Loan Amount',
    ]);

    expect(
      prismaMock.applicationStatusHistory.create,
    ).toHaveBeenCalledWith({
      data: {
        applicationId: 'application-1',
        status: 'ELIGIBILITY_CHECK',
      },
    });
  });

  it('should reject when credit score is below minimum', async () => {
    prismaMock.customer.findUnique.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.application.findUnique.mockResolvedValue({
      id: 'application-1',
      customerId: 'customer-1',
      status: 'LEAD',
    });

    prismaMock.lenderProduct.findMany.mockResolvedValue([
      {
        id: 'product-1',
        name: 'HDFC Personal Loan',
        code: 'HDFC_PERSONAL',
        minAmount: '50000',
        maxAmount: '2000000',
        minTenure: 12,
        maxTenure: 60,

        lender: {
          id: 'lender-1',
          name: 'HDFC Bank',
          code: 'HDFC',
        },

        rules: [
          {
            name: 'Minimum Credit Score',
            version: 1,
            ruleType: 'CREDIT_SCORE',
            ruleConfig: {
              minimum: 650,
            },
          },
        ],
      },
    ]);

    prismaMock.eligibilityCheck.create.mockResolvedValue({
      id: 'eligibility-1',
    });

    const result =
      await service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 500000,
        tenureMonths: 60,
        monthlyIncome: 50000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 600,
      });

    expect(result.eligible).toBe(false);
    expect(result.count).toBe(0);

    expect(
      result.allResults[0].failedRules,
    ).toContain(
      'Credit score should be at least 650',
    );
  });

  it('should reject when monthly income is below minimum', async () => {
    prismaMock.customer.findUnique.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.application.findUnique.mockResolvedValue({
      id: 'application-1',
      customerId: 'customer-1',
      status: 'LEAD',
    });

    prismaMock.lenderProduct.findMany.mockResolvedValue([
      {
        id: 'product-1',
        name: 'HDFC Personal Loan',
        code: 'HDFC_PERSONAL',
        minAmount: '50000',
        maxAmount: '2000000',
        minTenure: 12,
        maxTenure: 60,

        lender: {
          id: 'lender-1',
          name: 'HDFC Bank',
          code: 'HDFC',
        },

        rules: [
          {
            name: 'Minimum Monthly Income',
            version: 1,
            ruleType: 'MIN_INCOME',
            ruleConfig: {
              minimum: 15000,
            },
          },
        ],
      },
    ]);

    prismaMock.eligibilityCheck.create.mockResolvedValue({
      id: 'eligibility-1',
    });

    const result =
      await service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 500000,
        tenureMonths: 60,
        monthlyIncome: 10000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 750,
      });

    expect(result.eligible).toBe(false);

    expect(
      result.allResults[0].failedRules,
    ).toContain(
      'Minimum monthly income should be 15000',
    );
  });

  it('should reject when requested amount exceeds lender maximum', async () => {
    prismaMock.customer.findUnique.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.application.findUnique.mockResolvedValue({
      id: 'application-1',
      customerId: 'customer-1',
      status: 'LEAD',
    });

    prismaMock.lenderProduct.findMany.mockResolvedValue([
      {
        id: 'product-1',
        name: 'HDFC Personal Loan',
        code: 'HDFC_PERSONAL',
        minAmount: '50000',
        maxAmount: '2000000',
        minTenure: 12,
        maxTenure: 60,

        lender: {
          id: 'lender-1',
          name: 'HDFC Bank',
          code: 'HDFC',
        },

        rules: [
          {
            name: 'Maximum Loan Amount',
            version: 1,
            ruleType: 'MAX_AMOUNT',
            ruleConfig: {
              maximum: 2000000,
            },
          },
        ],
      },
    ]);

    prismaMock.eligibilityCheck.create.mockResolvedValue({
      id: 'eligibility-1',
    });

    const result =
      await service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 2500000,
        tenureMonths: 60,
        monthlyIncome: 50000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 750,
      });

    expect(result.eligible).toBe(false);

    expect(
      result.allResults[0].failedRules,
    ).toContain(
      'Requested amount should not exceed 2000000',
    );
  });

  it('should ignore INTEREST_RATE during eligibility evaluation', async () => {
    prismaMock.customer.findUnique.mockResolvedValue({
      id: 'customer-1',
    });

    prismaMock.application.findUnique.mockResolvedValue({
      id: 'application-1',
      customerId: 'customer-1',
      status: 'LEAD',
    });

    prismaMock.lenderProduct.findMany.mockResolvedValue([
      {
        id: 'product-1',
        name: 'HDFC Personal Loan',
        code: 'HDFC_PERSONAL',
        minAmount: '50000',
        maxAmount: '2000000',
        minTenure: 12,
        maxTenure: 60,

        lender: {
          id: 'lender-1',
          name: 'HDFC Bank',
          code: 'HDFC',
        },

        rules: [
          {
            name: 'Interest Rate',
            version: 1,
            ruleType: 'INTEREST_RATE',
            ruleConfig: {
              rate: 10.75,
            },
          },
        ],
      },
    ]);

    prismaMock.eligibilityCheck.create.mockResolvedValue({
      id: 'eligibility-1',
    });

    const result =
      await service.checkEligibility({
        customerId: 'customer-1',
        applicationId: 'application-1',
        loanType: 'PERSONAL',
        requestedAmount: 500000,
        tenureMonths: 60,
        monthlyIncome: 50000,
        employmentType: 'SALARIED',
        age: 25,
        creditScore: 750,
      });

    expect(result.eligible).toBe(true);
    expect(result.count).toBe(1);

    expect(
      result.allResults[0].failedRules,
    ).not.toContain(
      'Unsupported rule type: INTEREST_RATE',
    );
  });
});