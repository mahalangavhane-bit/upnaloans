import { Module } from '@nestjs/common';
import { LenderRulesController } from './lender-rules.controller';
import { LenderRulesService } from './lender-rules.service';

@Module({
  controllers: [LenderRulesController],
  providers: [LenderRulesService]
})
export class LenderRulesModule {}
