import {
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class MatchLenderDto {
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
  creditScore: number;
}