import { Module } from '@nestjs/common';

import { LoanOffersController } from './loan-offers.controller';
import { LoanOffersService } from './loan-offers.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoanOffersController],
  providers: [LoanOffersService],
})
export class LoanOffersModule {}