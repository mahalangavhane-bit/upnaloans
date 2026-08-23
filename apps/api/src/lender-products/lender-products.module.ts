import { Module } from '@nestjs/common';

import { LenderProductsController } from './lender-products.controller';
import { LenderProductsService } from './lender-products.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LenderProductsController],
  providers: [LenderProductsService],
})
export class LenderProductsModule {}