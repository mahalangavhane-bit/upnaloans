export interface LenderEligibilityInput {
  customerId: string;
  applicationId: string;
  loanType: string;
  requestedAmount: number;
  tenureMonths: number;
  monthlyIncome: number;
  creditScore: number;
  age: number;
  employmentType: string;
}

export interface LenderEligibilityResult {
  eligible: boolean;
  reason?: string;
  lenderCode: string;
  productCode?: string;
}

export interface LenderOfferInput {
  applicationId: string;
  loanType: string;
  requestedAmount: number;
  tenureMonths: number;
  creditScore: number;
  monthlyIncome: number;
}

export interface LenderOfferResult {
  lenderCode: string;
  productCode?: string;
  approved: boolean;
  amount?: number;
  interestRate?: number;
  tenure?: number;
  monthlyEmi?: number;
  reason?: string;
}

export interface LenderSubmissionInput {
  applicationId: string;
  customerId: string;
  requestedAmount: number;
  tenureMonths: number;
}

export interface LenderSubmissionResult {
  lenderCode: string;
  success: boolean;
  referenceId?: string;
  status: string;
  message?: string;
}

export interface LenderAdapter {
  readonly lenderCode: string;

  checkEligibility(
    input: LenderEligibilityInput,
  ): Promise<LenderEligibilityResult>;

  generateOffer(
    input: LenderOfferInput,
  ): Promise<LenderOfferResult>;

  submitApplication(
    input: LenderSubmissionInput,
  ): Promise<LenderSubmissionResult>;
}