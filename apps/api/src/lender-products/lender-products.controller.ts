import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LenderProductsService } from './lender-products.service';
import { CreateLenderProductDto } from './dto/create-lender-product.dto';

@Controller('lender-products')
export class LenderProductsController {
  constructor(
    private readonly lenderProductsService: LenderProductsService,
  ) {}

  @Post()
  create(@Body() dto: CreateLenderProductDto) {
    return this.lenderProductsService.create(dto);
  }

  @Get()
  findAll() {
    return this.lenderProductsService.findAll();
  }
}