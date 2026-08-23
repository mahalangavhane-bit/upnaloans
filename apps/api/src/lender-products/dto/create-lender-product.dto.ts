export class CreateLenderProductDto {
  lenderId: string;

  name: string;

  code: string;

  minAmount?: number;

  maxAmount?: number;

  minTenure?: number;

  maxTenure?: number;
}