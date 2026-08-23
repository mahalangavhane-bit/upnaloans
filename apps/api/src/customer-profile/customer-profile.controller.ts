import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CustomerProfileService } from './customer-profile.service';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('customer-profile')
@UseGuards(JwtAuthGuard)
export class CustomerProfileController {
  constructor(
    private readonly customerProfileService: CustomerProfileService,
  ) {}

  @Post()
  create(@Body() createCustomerProfileDto: CreateCustomerProfileDto) {
    return this.customerProfileService.create(createCustomerProfileDto);
  }

  @Get(':customerId')
  findOne(@Param('customerId') customerId: string) {
    return this.customerProfileService.findOne(customerId);
  }

  @Patch(':customerId')
  update(
    @Param('customerId') customerId: string,
    @Body() data: Partial<CreateCustomerProfileDto>,
  ) {
    return this.customerProfileService.update(customerId, data);
  }

  @Delete(':customerId')
  remove(@Param('customerId') customerId: string) {
    return this.customerProfileService.remove(customerId);
  }
}