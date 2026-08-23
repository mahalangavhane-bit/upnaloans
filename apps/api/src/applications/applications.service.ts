import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: createApplicationDto.customerId,
      },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createApplicationDto.customerId} not found`,
      );
    }

    return this.prisma.application.create({
      data: {
        customerId: createApplicationDto.customerId,
        leadId: createApplicationDto.leadId,
        loanType: createApplicationDto.loanType,
        amount: createApplicationDto.amount,
        tenure: createApplicationDto.tenure,
      },
    });
  }

  async findAll() {
    return this.prisma.application.findMany({
      include: {
        customer: true,
        lead: true,
      },
    });
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        lead: true,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    return application;
  }

  async getStatusHistory(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    return this.prisma.applicationStatusHistory.findMany({
      where: {
        applicationId: id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    return this.prisma.application.update({
      where: {
        id,
      },
      data: updateApplicationDto,
    });
  }

  private async createAuditLog(
    tx: any,
    applicationId: string,
    oldStatus: string,
    newStatus: string,
  ) {
    return tx.auditLog.create({
      data: {
        applicationId,
        action: 'APPLICATION_STATUS_CHANGED',
        entityType: 'Application',
        entityId: applicationId,
        oldValue: {
          status: oldStatus,
        },
        newValue: {
          status: newStatus,
        },
      },
    });
  }

  async submitToLender(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    if (application.status !== 'KYC') {
      throw new ConflictException(
        'Only KYC completed applications can be submitted to lender',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedApplication =
        await tx.application.update({
          where: {
            id,
          },
          data: {
            status: 'LENDER_SUBMITTED',
          },
        });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          status: 'LENDER_SUBMITTED',
        },
      });

      await this.createAuditLog(
        tx,
        id,
        application.status,
        'LENDER_SUBMITTED',
      );

      return updatedApplication;
    });
  }

  async startReview(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    if (application.status !== 'LENDER_SUBMITTED') {
      throw new ConflictException(
        'Only lender-submitted applications can enter review',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedApplication =
        await tx.application.update({
          where: {
            id,
          },
          data: {
            status: 'UNDER_REVIEW',
          },
        });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          status: 'UNDER_REVIEW',
        },
      });

      await this.createAuditLog(
        tx,
        id,
        application.status,
        'UNDER_REVIEW',
      );

      return updatedApplication;
    });
  }

  async approve(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    if (application.status !== 'UNDER_REVIEW') {
      throw new ConflictException(
        'Only applications under review can be approved',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedApplication =
        await tx.application.update({
          where: {
            id,
          },
          data: {
            status: 'APPROVED',
          },
        });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          status: 'APPROVED',
        },
      });

      await this.createAuditLog(
        tx,
        id,
        application.status,
        'APPROVED',
      );

      return updatedApplication;
    });
  }

  async sanction(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    if (application.status !== 'APPROVED') {
      throw new ConflictException(
        'Only approved applications can be sanctioned',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedApplication =
        await tx.application.update({
          where: {
            id,
          },
          data: {
            status: 'SANCTIONED',
          },
        });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          status: 'SANCTIONED',
        },
      });

      await this.createAuditLog(
        tx,
        id,
        application.status,
        'SANCTIONED',
      );

      return updatedApplication;
    });
  }

  async disburse(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    if (application.status !== 'SANCTIONED') {
      throw new ConflictException(
        'Only sanctioned applications can be disbursed',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedApplication =
        await tx.application.update({
          where: {
            id,
          },
          data: {
            status: 'DISBURSED',
          },
        });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: id,
          status: 'DISBURSED',
        },
      });

      await this.createAuditLog(
        tx,
        id,
        application.status,
        'DISBURSED',
      );

      return updatedApplication;
    });
  }

  async remove(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${id} not found`,
      );
    }

    return this.prisma.application.delete({
      where: {
        id,
      },
    });
  }
}