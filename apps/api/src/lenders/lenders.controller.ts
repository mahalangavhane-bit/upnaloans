import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LendersService } from './lenders.service';
import { CreateLenderDto } from './dto/create-lender.dto';

@Controller('lenders')
export class LendersController {
  constructor(
    private readonly lendersService: LendersService,
  ) {}

  @Post()
  create(@Body() dto: CreateLenderDto) {
    return this.lendersService.create(dto);
  }

  @Get()
  findAll() {
    return this.lendersService.findAll();
  }
}