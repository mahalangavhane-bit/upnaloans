export class CreateLoanOfferDto {
  applicationId: string;

  lenderId: string;

  productId?: string;

  amount: number;

  interestRate: number;

  tenure: number;

  expiresAt?: string;
}