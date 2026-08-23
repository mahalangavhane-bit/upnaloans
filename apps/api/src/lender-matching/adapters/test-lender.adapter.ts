import {
  LenderAdapter,
  LenderEligibilityInput,
  LenderEligibilityResult,
  LenderOfferInput,
  LenderOfferResult,
  LenderSubmissionInput,
  LenderSubmissionResult,
} from './lender-adapter.interface';

export class TestLenderAdapter
  implements LenderAdapter
{
  readonly lenderCode = 'TEST_LENDER';

  async checkEligibility(
    input: LenderEligibilityInput,
  ): Promise<LenderEligibilityResult> {
    if (input.creditScore < 650) {
      return {
        eligible: false,
        lenderCode: this.lenderCode,
        reason: 'Credit score below minimum',
      };
    }

    if (input.monthlyIncome < 15000) {
      return {
        eligible: false,
        lenderCode: this.lenderCode,
        reason: 'Monthly income below minimum',
      };
    }

    return {
      eligible: true,
      lenderCode: this.lenderCode,
      productCode: 'TEST_PERSONAL_LOAN',
    };
  }

  async generateOffer(
    input: LenderOfferInput,
  ): Promise<LenderOfferResult> {
    if (input.creditScore < 650) {
      return {
        lenderCode: this.lenderCode,
        productCode: 'TEST_PERSONAL_LOAN',
        approved: false,
        reason: 'Credit score below minimum',
      };
    }

    const annualRate = 10.75;
    const monthlyRate = annualRate / 12 / 100;
    const months = input.tenureMonths;
    const principal = input.requestedAmount;

    let monthlyEmi = 0;

    if (monthlyRate === 0) {
      monthlyEmi = principal / months;
    } else {
      monthlyEmi =
        (principal *
          monthlyRate *
          Math.pow(
            1 + monthlyRate,
            months,
          )) /
        (Math.pow(
          1 + monthlyRate,
          months,
        ) - 1);
    }

    return {
      lenderCode: this.lenderCode,
      productCode: 'TEST_PERSONAL_LOAN',
      approved: true,
      amount: principal,
      interestRate: annualRate,
      tenure: months,
      monthlyEmi: Number(
        monthlyEmi.toFixed(2),
      ),
    };
  }

  async submitApplication(
    input: LenderSubmissionInput,
  ): Promise<LenderSubmissionResult> {
    return {
      lenderCode: this.lenderCode,
      success: true,
      referenceId: `TEST-${input.applicationId}`,
      status: 'SUBMITTED',
      message: 'Test lender accepted application',
    };
  }
}