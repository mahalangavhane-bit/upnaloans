import { Module } from '@nestjs/common';

import { LendersController } from './lenders.controller';
import { LendersService } from './lenders.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LendersController],
  providers: [LendersService],
})
export class LendersModule {}