import { Module } from '@nestjs/common';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentUrlService } from './document-url.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    DocumentUrlService,
  ],
  exports: [
    DocumentsService,
    DocumentUrlService,
  ],
})
export class DocumentsModule {}