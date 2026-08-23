import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { LenderMatchingService } from './lender-matching.service';
import { MatchLenderDto } from './dto/match-lender.dto';

@Controller('lender-matching')
export class LenderMatchingController {
  constructor(
    private readonly lenderMatchingService: LenderMatchingService,
  ) {}

  @Post('match')
  matchLenders(@Body() dto: MatchLenderDto) {
    return this.lenderMatchingService.matchLenders(dto);
  }
}