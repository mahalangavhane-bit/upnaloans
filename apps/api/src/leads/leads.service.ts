import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto) {
    if (createLeadDto.customerId) {
      const customer = await this.prisma.customer.findUnique({
        where: {
          id: createLeadDto.customerId,
        },
      });

      if (!customer) {
        throw new NotFoundException(
          `Customer with ID ${createLeadDto.customerId} not found`,
        );
      }
    }

    if (createLeadDto.ownerId) {
      const owner = await this.prisma.user.findUnique({
        where: {
          id: createLeadDto.ownerId,
        },
      });

      if (!owner) {
        throw new NotFoundException(
          `User with ID ${createLeadDto.ownerId} not found`,
        );
      }
    }

    return this.prisma.lead.create({
      data: {
        customerId: createLeadDto.customerId,
        ownerId: createLeadDto.ownerId,
        status: createLeadDto.status,
        source: createLeadDto.source,
      },
    });
  }

  async findAll() {
    return this.prisma.lead.findMany({
      include: {
        customer: true,
        owner: true,
        applications: true,
      },
    });
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        customer: true,
        owner: true,
        applications: true,
      },
    });

    if (!lead) {
      throw new NotFoundException(
        `Lead with ID ${id} not found`,
      );
    }

    return lead;
  }

  async update(
    id: string,
    data: Partial<CreateLeadDto>,
  ) {
    await this.findOne(id);

    if (data.customerId) {
      const customer = await this.prisma.customer.findUnique({
        where: {
          id: data.customerId,
        },
      });

      if (!customer) {
        throw new NotFoundException(
          `Customer with ID ${data.customerId} not found`,
        );
      }
    }

    if (data.ownerId) {
      const owner = await this.prisma.user.findUnique({
        where: {
          id: data.ownerId,
        },
      });

      if (!owner) {
        throw new NotFoundException(
          `User with ID ${data.ownerId} not found`,
        );
      }
    }

    return this.prisma.lead.update({
      where: { id },
      data: {
        customerId: data.customerId,
        ownerId: data.ownerId,
        status: data.status,
        source: data.source,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.lead.delete({
      where: { id },
    });
  }
}