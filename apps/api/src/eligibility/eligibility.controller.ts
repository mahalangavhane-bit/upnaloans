import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EligibilityService } from './eligibility.service';
import { CheckEligibilityDto } from './dto/check-eligibility.dto';

@Controller('eligibility')
@UseGuards(JwtAuthGuard)
export class EligibilityController {
  constructor(
    private readonly eligibilityService: EligibilityService,
  ) {}

  @Post('check')
  checkEligibility(@Body() dto: CheckEligibilityDto) {
    return this.eligibilityService.checkEligibility(dto);
  }

  @Get('application/:applicationId')
  getEligibilityByApplication(
    @Param('applicationId') applicationId: string,
  ) {
    return this.eligibilityService.getEligibilityByApplication(
      applicationId,
    );
  }
}