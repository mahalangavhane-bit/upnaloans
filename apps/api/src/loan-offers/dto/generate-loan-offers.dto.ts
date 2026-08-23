import { IsUUID } from 'class-validator';

export class GenerateLoanOffersDto {
  @IsUUID()
  applicationId: string;
}