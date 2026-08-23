jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { Test, TestingModule } from '@nestjs/testing';

import { DocumentsService } from './documents.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  const prismaMock = {
    application: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },

    document: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },

    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaMock.$transaction.mockImplementation(
      async (callback) => callback(prismaMock),
    );

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          DocumentsService,
          {
            provide: PrismaService,
            useValue: prismaMock,
          },
        ],
      }).compile();

    service =
      module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      applicationId: 'application-1',
      documentType: 'PAN_CARD',
      fileName: 'pan-card.pdf',
      fileUrl: 'local://documents/pan-card.pdf',
    };

    it('should create a document for an owned CUSTOMER_SELECTED application', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
        status: 'CUSTOMER_SELECTED',
      });

      prismaMock.document.create.mockResolvedValue({
        id: 'document-1',
        ...dto,
        status: 'UPLOADED',
      });

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'DOCUMENT_COLLECTION',
      });

      const result = await service.create(
        dto,
        'customer-1',
      );

      expect(result.status).toBe('UPLOADED');

      expect(prismaMock.document.create).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          documentType: 'PAN_CARD',
          fileName: 'pan-card.pdf',
          fileUrl: 'local://documents/pan-card.pdf',
          status: 'UPLOADED',
        },
      });
    });

    it('should allow additional documents in DOCUMENT_COLLECTION', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
        status: 'DOCUMENT_COLLECTION',
      });

      prismaMock.document.create.mockResolvedValue({
        id: 'document-2',
        applicationId: 'application-1',
        documentType: 'INCOME_PROOF',
        fileName: 'salary-slip.pdf',
        fileUrl: 'local://documents/salary-slip.pdf',
        status: 'UPLOADED',
      });

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'DOCUMENT_COLLECTION',
      });

      const result = await service.create(
        {
          ...dto,
          documentType: 'INCOME_PROOF',
          fileName: 'salary-slip.pdf',
          fileUrl: 'local://documents/salary-slip.pdf',
        },
        'customer-1',
      );

      expect(result.status).toBe('UPLOADED');
    });

    it('should reject upload when application does not exist', async () => {
      prismaMock.application.findUnique.mockResolvedValue(null);

      await expect(
        service.create(dto, 'customer-1'),
      ).rejects.toThrow(
        'Application with ID application-1 not found',
      );
    });

    it('should reject upload to a foreign application', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-2',
        status: 'CUSTOMER_SELECTED',
      });

      await expect(
        service.create(dto, 'customer-1'),
      ).rejects.toThrow(
        'You are not allowed to access this application',
      );

      expect(
        prismaMock.document.create,
      ).not.toHaveBeenCalled();
    });

    it('should reject upload when application is in invalid state', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
        status: 'APPROVED',
      });

      await expect(
        service.create(dto, 'customer-1'),
      ).rejects.toThrow(
        'Documents can only be uploaded after customer selects an offer',
      );
    });
  });

  describe('findByApplication', () => {
    it('should return documents for owned application', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
      });

      prismaMock.document.findMany.mockResolvedValue([
        {
          id: 'document-1',
          applicationId: 'application-1',
          status: 'UPLOADED',
        },
      ]);

      const result =
        await service.findByApplication(
          'application-1',
          'customer-1',
        );

      expect(result).toHaveLength(1);

      expect(
        prismaMock.document.findMany,
      ).toHaveBeenCalledWith({
        where: {
          applicationId: 'application-1',
        },
        orderBy: {
          uploadedAt: 'desc',
        },
      });
    });

    it('should reject foreign application access', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-2',
      });

      await expect(
        service.findByApplication(
          'application-1',
          'customer-1',
        ),
      ).rejects.toThrow(
        'You are not allowed to access this application',
      );

      expect(
        prismaMock.document.findMany,
      ).not.toHaveBeenCalled();
    });
  });

  describe('verify', () => {
    it('should verify an owned uploaded document', async () => {
      prismaMock.document.findUnique.mockResolvedValue({
        id: 'document-1',
        applicationId: 'application-1',
        documentType: 'PAN_CARD',
        status: 'UPLOADED',
      });

      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
      });

      prismaMock.document.update.mockResolvedValue({
        id: 'document-1',
        applicationId: 'application-1',
        documentType: 'PAN_CARD',
        status: 'VERIFIED',
      });

      prismaMock.document.findMany.mockResolvedValue([
        {
          documentType: 'PAN_CARD',
          status: 'VERIFIED',
        },
        {
          documentType: 'INCOME_PROOF',
          status: 'VERIFIED',
        },
      ]);

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'KYC',
      });

      const result = await service.verify(
        'document-1',
        'customer-1',
      );

      expect(result.status).toBe('VERIFIED');

      expect(
        prismaMock.document.update,
      ).toHaveBeenCalled();

      expect(
        prismaMock.application.update,
      ).toHaveBeenCalledWith({
        where: {
          id: 'application-1',
        },
        data: {
          status: 'KYC',
        },
      });
    });

    it('should reject verification of a foreign document', async () => {
      prismaMock.document.findUnique.mockResolvedValue({
        id: 'document-1',
        applicationId: 'application-1',
        documentType: 'PAN_CARD',
        status: 'UPLOADED',
      });

      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-2',
      });

      await expect(
        service.verify(
          'document-1',
          'customer-1',
        ),
      ).rejects.toThrow(
        'You are not allowed to access this application',
      );

      expect(
        prismaMock.document.update,
      ).not.toHaveBeenCalled();
    });

    it('should reject verification when document does not exist', async () => {
      prismaMock.document.findUnique.mockResolvedValue(null);

      await expect(
        service.verify(
          'missing-document',
          'customer-1',
        ),
      ).rejects.toThrow(
        'Document with ID missing-document not found',
      );
    });

    it('should reject re-verifying an already verified document', async () => {
      prismaMock.document.findUnique.mockResolvedValue({
        id: 'document-1',
        applicationId: 'application-1',
        documentType: 'PAN_CARD',
        status: 'VERIFIED',
      });

      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
      });

      await expect(
        service.verify(
          'document-1',
          'customer-1',
        ),
      ).rejects.toThrow(
        'Document is already verified',
      );
    });
  });

  describe('reject', () => {
    it('should reject an owned document', async () => {
      prismaMock.document.findUnique.mockResolvedValue({
        id: 'document-1',
        applicationId: 'application-1',
        documentType: 'PAN_CARD',
        status: 'UPLOADED',
      });

      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
      });

      prismaMock.document.update.mockResolvedValue({
        id: 'document-1',
        status: 'REJECTED',
      });

      const result = await service.reject(
        'document-1',
        'customer-1',
      );

      expect(result.status).toBe('REJECTED');

      expect(
        prismaMock.document.update,
      ).toHaveBeenCalledWith({
        where: {
          id: 'document-1',
        },
        data: {
          status: 'REJECTED',
          verifiedAt: null,
        },
      });
    });

    it('should reject access to a foreign document', async () => {
      prismaMock.document.findUnique.mockResolvedValue({
        id: 'document-1',
        applicationId: 'application-1',
        documentType: 'PAN_CARD',
        status: 'UPLOADED',
      });

      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-2',
      });

      await expect(
        service.reject(
          'document-1',
          'customer-1',
        ),
      ).rejects.toThrow(
        'You are not allowed to access this application',
      );

      expect(
        prismaMock.document.update,
      ).not.toHaveBeenCalled();
    });

    it('should throw when rejecting a missing document', async () => {
      prismaMock.document.findUnique.mockResolvedValue(null);

      await expect(
        service.reject(
          'missing-document',
          'customer-1',
        ),
      ).rejects.toThrow(
        'Document with ID missing-document not found',
      );
    });
  });

  describe('completeDocumentCollection', () => {
    it('should move owned application to KYC when all required documents are verified', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
        status: 'DOCUMENT_COLLECTION',
      });

      prismaMock.document.findMany.mockResolvedValue([
        {
          documentType: 'PAN_CARD',
          status: 'VERIFIED',
        },
        {
          documentType: 'INCOME_PROOF',
          status: 'VERIFIED',
        },
      ]);

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'KYC',
      });

      const result =
        await service.completeDocumentCollection(
          'application-1',
          'customer-1',
        );

      expect(result.status).toBe('KYC');
    });

    it('should reject KYC completion for a foreign application', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-2',
        status: 'DOCUMENT_COLLECTION',
      });

      await expect(
        service.completeDocumentCollection(
          'application-1',
          'customer-1',
        ),
      ).rejects.toThrow(
        'You are not allowed to access this application',
      );

      expect(
        prismaMock.document.findMany,
      ).not.toHaveBeenCalled();
    });

    it('should reject KYC completion when required documents are missing or unverified', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        customerId: 'customer-1',
        status: 'DOCUMENT_COLLECTION',
      });

      prismaMock.document.findMany.mockResolvedValue([
        {
          documentType: 'PAN_CARD',
          status: 'VERIFIED',
        },
      ]);

      await expect(
        service.completeDocumentCollection(
          'application-1',
          'customer-1',
        ),
      ).rejects.toThrow(
        'All required documents must be verified before KYC',
      );
    });

    it('should throw when application does not exist', async () => {
      prismaMock.application.findUnique.mockResolvedValue(null);

      await expect(
        service.completeDocumentCollection(
          'missing-application',
          'customer-1',
        ),
      ).rejects.toThrow(
        'Application with ID missing-application not found',
      );
    });
  });
});