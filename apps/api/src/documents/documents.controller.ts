import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentUrlService } from './document-url.service';
import { DocumentsService } from './documents.service';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly documentUrlService: DocumentUrlService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateDocumentDto,
    @Req() req: Request,
  ) {
    return this.documentsService.create(
      dto,
      req.user!.customerId,
    );
  }

  @Get('application/:applicationId')
  findByApplication(
    @Param('applicationId') applicationId: string,
    @Req() req: Request,
  ) {
    return this.documentsService.findByApplication(
      applicationId,
      req.user!.customerId,
    );
  }

  @Get(':id/signed-url')
  getSignedUrl(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.documentsService.generateSignedUrl(
      id,
      req.user!.customerId,
    );
  }

  @Get(':id/download')
  download(
    @Param('id') id: string,
    @Query('customerId') customerId: string,
    @Query('expires') expires: string,
    @Query('signature') signature: string,
  ) {
    this.documentUrlService.verify(
      id,
      customerId,
      Number(expires),
      signature,
    );

    return {
      success: true,
      documentId: id,
      message: 'Signed document URL is valid',
    };
  }

  @Patch('application/:applicationId/complete')
  completeDocumentCollection(
    @Param('applicationId') applicationId: string,
    @Req() req: Request,
  ) {
    return this.documentsService.completeDocumentCollection(
      applicationId,
      req.user!.customerId,
    );
  }

  @Patch(':id/verify')
  verify(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.documentsService.verify(
      id,
      req.user!.customerId,
    );
  }

  @Patch(':id/reject')
  reject(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.documentsService.reject(
      id,
      req.user!.customerId,
    );
  }
}