import { TestLenderAdapter } from './test-lender.adapter';

describe('TestLenderAdapter contract', () => {
  let adapter: TestLenderAdapter;

  beforeEach(() => {
    adapter = new TestLenderAdapter();
  });

  it('should expose a lender code', () => {
    expect(adapter.lenderCode).toBe(
      'TEST_LENDER',
    );
  });

  describe('checkEligibility', () => {
    it('should return eligible for valid customer input', async () => {
      const result =
        await adapter.checkEligibility({
          customerId: 'customer-1',
          applicationId: 'application-1',
          loanType: 'PERSONAL',
          requestedAmount: 500000,
          tenureMonths: 60,
          monthlyIncome: 50000,
          creditScore: 750,
          age: 25,
          employmentType: 'SALARIED',
        });

      expect(result).toMatchObject({
        eligible: true,
        lenderCode: 'TEST_LENDER',
        productCode: 'TEST_PERSONAL_LOAN',
      });
    });

    it('should reject low credit score', async () => {
      const result =
        await adapter.checkEligibility({
          customerId: 'customer-1',
          applicationId: 'application-1',
          loanType: 'PERSONAL',
          requestedAmount: 500000,
          tenureMonths: 60,
          monthlyIncome: 50000,
          creditScore: 600,
          age: 25,
          employmentType: 'SALARIED',
        });

      expect(result.eligible).toBe(false);
      expect(result.reason).toBe(
        'Credit score below minimum',
      );
    });

    it('should reject low monthly income', async () => {
      const result =
        await adapter.checkEligibility({
          customerId: 'customer-1',
          applicationId: 'application-1',
          loanType: 'PERSONAL',
          requestedAmount: 500000,
          tenureMonths: 60,
          monthlyIncome: 10000,
          creditScore: 750,
          age: 25,
          employmentType: 'SALARIED',
        });

      expect(result.eligible).toBe(false);
      expect(result.reason).toBe(
        'Monthly income below minimum',
      );
    });
  });

  describe('generateOffer', () => {
    it('should generate an approved offer', async () => {
      const result =
        await adapter.generateOffer({
          applicationId: 'application-1',
          loanType: 'PERSONAL',
          requestedAmount: 500000,
          tenureMonths: 60,
          creditScore: 750,
          monthlyIncome: 50000,
        });

      expect(result).toMatchObject({
        lenderCode: 'TEST_LENDER',
        productCode: 'TEST_PERSONAL_LOAN',
        approved: true,
        amount: 500000,
        interestRate: 10.75,
        tenure: 60,
      });

      expect(result.monthlyEmi).toBeCloseTo(
        10808.98,
        2,
      );
    });

    it('should reject an offer for low credit score', async () => {
      const result =
        await adapter.generateOffer({
          applicationId: 'application-1',
          loanType: 'PERSONAL',
          requestedAmount: 500000,
          tenureMonths: 60,
          creditScore: 600,
          monthlyIncome: 50000,
        });

      expect(result.approved).toBe(false);
      expect(result.reason).toBe(
        'Credit score below minimum',
      );
    });
  });

  describe('submitApplication', () => {
    it('should submit application successfully', async () => {
      const result =
        await adapter.submitApplication({
          applicationId: 'application-1',
          customerId: 'customer-1',
          requestedAmount: 500000,
          tenureMonths: 60,
        });

      expect(result).toMatchObject({
        lenderCode: 'TEST_LENDER',
        success: true,
        status: 'SUBMITTED',
        referenceId: 'TEST-application-1',
      });

      expect(result.message).toBe(
        'Test lender accepted application',
      );
    });
  });
});