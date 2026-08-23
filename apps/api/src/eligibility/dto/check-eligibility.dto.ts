import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CheckEligibilityDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  applicationId: string;

  @IsString()
  loanType: string;

  @IsNumber()
  requestedAmount: number;

  @IsNumber()
  tenureMonths: number;

  @IsNumber()
  monthlyIncome: number;

  @IsString()
  employmentType: string;

  @IsNumber()
  age: number;

  @IsNumber()
  creditScore: number;
}