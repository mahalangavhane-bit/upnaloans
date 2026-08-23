import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLenderDto } from './dto/create-lender.dto';

@Injectable()
export class LendersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLenderDto) {
    const existingLender = await this.prisma.lender.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (existingLender) {
      throw new ConflictException(
        `Lender with code ${dto.code} already exists`,
      );
    }

    return this.prisma.lender.create({
      data: {
        name: dto.name,
        code: dto.code,
      },
    });
  }

  async findAll() {
    return this.prisma.lender.findMany({
      include: {
        products: true,
      },
    });
  }
}