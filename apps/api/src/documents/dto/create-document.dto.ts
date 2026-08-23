import { IsString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsUUID()
  applicationId: string;

  @IsString()
  documentType: string;

  @IsString()
  fileName: string;

  @IsString()
  fileUrl: string;
}