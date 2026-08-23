import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';

@Injectable()
export class CustomerProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerProfileDto: CreateCustomerProfileDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: createCustomerProfileDto.customerId,
      },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createCustomerProfileDto.customerId} not found`,
      );
    }

    return this.prisma.customerProfile.create({
      data: {
        customerId: createCustomerProfileDto.customerId,
        firstName: createCustomerProfileDto.firstName,
        lastName: createCustomerProfileDto.lastName,
        email: createCustomerProfileDto.email,
        phone: createCustomerProfileDto.phone,
        city: createCustomerProfileDto.city,
        state: createCustomerProfileDto.state,
        pincode: createCustomerProfileDto.pincode,
      },
    });
  }

  async findOne(customerId: string) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: {
        customerId,
      },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile for customer ${customerId} not found`,
      );
    }

    return profile;
  }

  async update(
    customerId: string,
    data: Partial<CreateCustomerProfileDto>,
  ) {
    await this.findOne(customerId);

    return this.prisma.customerProfile.update({
      where: {
        customerId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
    });
  }

  async remove(customerId: string) {
    await this.findOne(customerId);

    return this.prisma.customerProfile.delete({
      where: {
        customerId,
      },
    });
  }
}