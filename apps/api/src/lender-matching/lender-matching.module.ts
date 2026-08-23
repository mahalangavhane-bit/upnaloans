import { Module } from '@nestjs/common';

import { LenderMatchingController } from './lender-matching.controller';
import { LenderMatchingService } from './lender-matching.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LenderMatchingController],
  providers: [LenderMatchingService],
})
export class LenderMatchingModule {}