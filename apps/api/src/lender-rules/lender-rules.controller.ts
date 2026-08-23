import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LenderRulesService } from './lender-rules.service';
import { CreateLenderRuleDto } from './dto/create-lender-rule.dto';

@Controller('lender-rules')
export class LenderRulesController {
  constructor(
    private readonly lenderRulesService: LenderRulesService,
  ) {}

  @Post()
  create(@Body() dto: CreateLenderRuleDto) {
    return this.lenderRulesService.create(dto);
  }

  @Get()
  findAll() {
    return this.lenderRulesService.findAll();
  }
}