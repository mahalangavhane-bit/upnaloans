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

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id/history')
  getStatusHistory(@Param('id') id: string) {
    return this.applicationsService.getStatusHistory(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, dto);
  }

  @Patch(':id/submit-to-lender')
  submitToLender(@Param('id') id: string) {
    return this.applicationsService.submitToLender(id);
  }

  @Patch(':id/start-review')
  startReview(@Param('id') id: string) {
    return this.applicationsService.startReview(id);
  }
  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.applicationsService.approve(id);
  }
  @Patch(':id/sanction')
  sanction(@Param('id') id: string) {
    return this.applicationsService.sanction(id);
  }
  @Patch(':id/disburse')
  disburse(@Param('id') id: string) {
    return this.applicationsService.disburse(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}