import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';


import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import {
  Roles,
  UserRole,
} from '../auth/roles.decorator';

import { RolesGuard } from '../auth/roles.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.CUSTOMER,
    UserRole.AGENT,
    UserRole.ADMIN,
  )
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  update(
    @Param('id') id: string,
    @Body() data: { userId?: string | null },
  ) {
    return this.customersService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}