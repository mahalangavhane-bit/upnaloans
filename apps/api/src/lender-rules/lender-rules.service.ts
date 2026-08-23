import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLenderRuleDto } from './dto/create-lender-rule.dto';

@Injectable()
export class LenderRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLenderRuleDto) {
    // Check lender exists
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

    // Check product exists if productId is provided
    if (dto.productId) {
      const product = await this.prisma.lenderProduct.findUnique({
        where: {
          id: dto.productId,
        },
      });

      if (!product) {
        throw new NotFoundException(
          `Lender product with ID ${dto.productId} not found`,
        );
      }

      // Make sure product belongs to the same lender
      if (product.lenderId !== dto.lenderId) {
        throw new ConflictException(
          'Product does not belong to the specified lender',
        );
      }
    }

    return this.prisma.lenderRule.create({
      data: {
        lenderId: dto.lenderId,
        productId: dto.productId,
        name: dto.name,
        version: dto.version ?? 1,
        ruleType: dto.ruleType,
        ruleConfig: dto.ruleConfig,
      },
    });
  }

  async findAll() {
    return this.prisma.lenderRule.findMany({
      include: {
        lender: true,
        product: true,
      },
    });
  }

  async findOne(id: string) {
    const rule = await this.prisma.lenderRule.findUnique({
      where: {
        id,
      },
      include: {
        lender: true,
        product: true,
      },
    });

    if (!rule) {
      throw new NotFoundException(
        `Lender rule with ID ${id} not found`,
      );
    }

    return rule;
  }
}