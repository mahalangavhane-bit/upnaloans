import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentUrlService } from './document-url.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentUrlService: DocumentUrlService,
  ) {}

  private async getOwnedApplication(
    applicationId: string,
    customerId: string,
  ) {
    const application =
      await this.prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    if (!application) {
      throw new NotFoundException(
        `Application with ID ${applicationId} not found`,
      );
    }

    if (application.customerId !== customerId) {
      throw new ForbiddenException(
        'You are not allowed to access this application',
      );
    }

    return application;
  }

  async create(
    dto: CreateDocumentDto,
    customerId: string,
  ) {
    const application =
      await this.getOwnedApplication(
        dto.applicationId,
        customerId,
      );

    if (
      application.status !== 'CUSTOMER_SELECTED' &&
      application.status !== 'DOCUMENT_COLLECTION'
    ) {
      throw new ConflictException(
        'Documents can only be uploaded after customer selects an offer',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const document =
        await tx.document.create({
          data: {
            applicationId: dto.applicationId,
            documentType: dto.documentType,
            fileName: dto.fileName,
            fileUrl: dto.fileUrl,
            status: 'UPLOADED',
          },
        });

      await tx.application.update({
        where: {
          id: dto.applicationId,
        },
        data: {
          status: 'DOCUMENT_COLLECTION',
        },
      });

      return document;
    });
  }

  async findByApplication(
    applicationId: string,
    customerId: string,
  ) {
    await this.getOwnedApplication(
      applicationId,
      customerId,
    );

    return this.prisma.document.findMany({
      where: {
        applicationId,
      },
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  }

  async generateSignedUrl(
    documentId: string,
    customerId: string,
  ) {
    const document =
      await this.prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

    if (!document) {
      throw new NotFoundException(
        `Document with ID ${documentId} not found`,
      );
    }

    await this.getOwnedApplication(
      document.applicationId,
      customerId,
    );

    return {
      documentId,
      ...this.documentUrlService.generate(
        documentId,
        customerId,
      ),
    };
  }

 async verify(
  id: string,
  customerId: string,
) {
  const document =
    await this.prisma.document.findUnique({
      where: {
        id,
      },
    });

  if (!document) {
    throw new NotFoundException(
      `Document with ID ${id} not found`,
    );
  }

  await this.getOwnedApplication(
    document.applicationId,
    customerId,
  );

  if (document.status === 'VERIFIED') {
    throw new ConflictException(
      'Document is already verified',
    );
  }

  return this.prisma.$transaction(
    async (tx) => {
      const updatedDocument =
        await tx.document.update({
          where: {
            id,
          },
          data: {
            status: 'VERIFIED',
            verifiedAt: new Date(),
          },
        });

      const requiredDocuments = [
        'PAN_CARD',
        'INCOME_PROOF',
      ];

      const documents =
        await tx.document.findMany({
          where: {
            applicationId:
              document.applicationId,
            documentType: {
              in: requiredDocuments,
            },
          },
        });

      const allRequiredDocumentsVerified =
        requiredDocuments.every(
          (type) =>
            documents.some(
              (doc) =>
                doc.documentType === type &&
                doc.status === 'VERIFIED',
            ),
        );

      if (allRequiredDocumentsVerified) {
        const application =
          await tx.application.findUnique({
            where: {
              id: document.applicationId,
            },
          });

        if (
          application &&
          application.status !== 'KYC'
        ) {
          await tx.application.update({
            where: {
              id: document.applicationId,
            },
            data: {
              status: 'KYC',
            },
          });

          await tx.applicationStatusHistory.create({
            data: {
              applicationId:
                document.applicationId,
              status: 'KYC',
            },
          });
        }
      }

      return updatedDocument;
    },
  );
}

 async completeDocumentCollection(
  applicationId: string,
  customerId: string,
) {
  const application =
    await this.getOwnedApplication(
      applicationId,
      customerId,
    );

  const requiredDocuments = [
    'PAN_CARD',
    'INCOME_PROOF',
  ];

  const documents =
    await this.prisma.document.findMany({
      where: {
        applicationId,
        documentType: {
          in: requiredDocuments,
        },
      },
    });

  const allRequiredDocumentsVerified =
    requiredDocuments.every(
      (type) =>
        documents.some(
          (doc) =>
            doc.documentType === type &&
            doc.status === 'VERIFIED',
        ),
    );

  if (!allRequiredDocumentsVerified) {
    throw new ConflictException(
      'All required documents must be verified before KYC',
    );
  }

  if (application.status === 'KYC') {
    return application;
  }

  return this.prisma.$transaction(async (tx) => {
    const updatedApplication =
      await tx.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: 'KYC',
        },
      });

    await tx.applicationStatusHistory.create({
      data: {
        applicationId,
        status: 'KYC',
      },
    });

    return updatedApplication;
  });
}

  async reject(
    id: string,
    customerId: string,
  ) {
    const document =
      await this.prisma.document.findUnique({
        where: {
          id,
        },
      });

    if (!document) {
      throw new NotFoundException(
        `Document with ID ${id} not found`,
      );
    }

    await this.getOwnedApplication(
      document.applicationId,
      customerId,
    );

    return this.prisma.document.update({
      where: {
        id,
      },
      data: {
        status: 'REJECTED',
        verifiedAt: null,
      },
    });
  }
}