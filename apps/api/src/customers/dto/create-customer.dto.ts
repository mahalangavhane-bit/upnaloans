import { IsOptional, IsUUID } from 'class-validator';

export class CreateCustomerDto {
  @IsOptional()
  @IsUUID()
  userId?: string;
}