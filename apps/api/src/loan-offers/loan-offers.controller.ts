import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoanOffersService } from './loan-offers.service';
import { CreateLoanOfferDto } from './dto/create-loan-offer.dto';
import { GenerateLoanOffersDto } from './dto/generate-loan-offers.dto';

@Controller('loan-offers')
@UseGuards(JwtAuthGuard)
export class LoanOffersController {
  constructor(
    private readonly loanOffersService: LoanOffersService,
  ) {}

  // Create loan offer
  @Post()
  createOffer(
    @Body() dto: CreateLoanOfferDto,
  ) {
    return this.loanOffersService.createOffer(dto);
  }

  // Get all loan offers
  @Get()
  getAllOffers() {
    return this.loanOffersService.getAllOffers();
  }
  @Patch(':id/present')
  presentOffer(
    @Param('id') id: string,
  ) {
    return this.loanOffersService.presentOffer(id);
  }
  @Patch(':id/select')
  selectOffer(
    @Param('id') id: string,
  ) {
    return this.loanOffersService.selectOffer(id);
  }

  // Get loan offer by ID
  @Get(':id')
  getOfferById(
    @Param('id') id: string,
  ) {
    return this.loanOffersService.getOfferById(id);
  }
  @Post('generate')
generateOffers(
  @Body() dto: GenerateLoanOffersDto,
) {
  return this.loanOffersService.generateOffers(
    dto.applicationId,
  );
}
}