import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLenderProductDto } from './dto/create-lender-product.dto';

@Injectable()
export class LenderProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLenderProductDto) {
    const lender = await this.prisma.lender.findUnique({
      where: {
        id: dto.lenderId,
      },
    });

    if (!lender) {
      throw new NotFoundException(
        `Lender with ID ${dto.lenderId} not found`,
      );
    }

    const existingProduct =
      await this.prisma.lenderProduct.findUnique({
        where: {
          lenderId_code: {
            lenderId: dto.lenderId,
            code: dto.code,
          },
        },
      });

    if (existingProduct) {
      throw new ConflictException(
        `Product with code ${dto.code} already exists for this lender`,
      );
    }

    return this.prisma.lenderProduct.create({
      data: {
        lenderId: dto.lenderId,
        name: dto.name,
        code: dto.code,
        minAmount: dto.minAmount,
        maxAmount: dto.maxAmount,
        minTenure: dto.minTenure,
        maxTenure: dto.maxTenure,
      },
    });
  }

  async findAll() {
    return this.prisma.lenderProduct.findMany({
      include: {
        lender: true,
        rules: true,
      },
    });
  }
}