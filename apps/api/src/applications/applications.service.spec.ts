jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationsService } from './applications.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  const prismaMock = {
    application: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },

    applicationStatusHistory: {
      create: jest.fn(),
    },

    auditLog: {
      create: jest.fn(),
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
          ApplicationsService,
          {
            provide: PrismaService,
            useValue: prismaMock,
          },
        ],
      }).compile();

    service =
      module.get<ApplicationsService>(
        ApplicationsService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitToLender', () => {
    it('should move KYC application to LENDER_SUBMITTED and create audit log', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'KYC',
      });

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'LENDER_SUBMITTED',
      });

      const result = await service.submitToLender(
        'application-1',
      );

      expect(result.status).toBe(
        'LENDER_SUBMITTED',
      );

      expect(
        prismaMock.applicationStatusHistory.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          status: 'LENDER_SUBMITTED',
        },
      });

      expect(
        prismaMock.auditLog.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          action: 'APPLICATION_STATUS_CHANGED',
          entityType: 'Application',
          entityId: 'application-1',
          oldValue: {
            status: 'KYC',
          },
          newValue: {
            status: 'LENDER_SUBMITTED',
          },
        },
      });
    });

    it('should reject submission when application is not KYC', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'UNDER_REVIEW',
      });

      await expect(
        service.submitToLender('application-1'),
      ).rejects.toThrow(
        'Only KYC completed applications can be submitted to lender',
      );

      expect(
        prismaMock.auditLog.create,
      ).not.toHaveBeenCalled();
    });
  });

  describe('startReview', () => {
    it('should move LENDER_SUBMITTED to UNDER_REVIEW and create audit log', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'LENDER_SUBMITTED',
      });

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'UNDER_REVIEW',
      });

      const result = await service.startReview(
        'application-1',
      );

      expect(result.status).toBe('UNDER_REVIEW');

      expect(
        prismaMock.applicationStatusHistory.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          status: 'UNDER_REVIEW',
        },
      });

      expect(
        prismaMock.auditLog.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          action: 'APPLICATION_STATUS_CHANGED',
          entityType: 'Application',
          entityId: 'application-1',
          oldValue: {
            status: 'LENDER_SUBMITTED',
          },
          newValue: {
            status: 'UNDER_REVIEW',
          },
        },
      });
    });

    it('should reject review when application is not lender submitted', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'KYC',
      });

      await expect(
        service.startReview('application-1'),
      ).rejects.toThrow(
        'Only lender-submitted applications can enter review',
      );

      expect(
        prismaMock.auditLog.create,
      ).not.toHaveBeenCalled();
    });
  });

  describe('approve', () => {
    it('should move UNDER_REVIEW to APPROVED and create audit log', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'UNDER_REVIEW',
      });

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'APPROVED',
      });

      const result = await service.approve(
        'application-1',
      );

      expect(result.status).toBe('APPROVED');

      expect(
        prismaMock.applicationStatusHistory.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          status: 'APPROVED',
        },
      });

      expect(
        prismaMock.auditLog.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          action: 'APPLICATION_STATUS_CHANGED',
          entityType: 'Application',
          entityId: 'application-1',
          oldValue: {
            status: 'UNDER_REVIEW',
          },
          newValue: {
            status: 'APPROVED',
          },
        },
      });
    });

    it('should reject approval when application is not under review', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'KYC',
      });

      await expect(
        service.approve('application-1'),
      ).rejects.toThrow(
        'Only applications under review can be approved',
      );

      expect(
        prismaMock.auditLog.create,
      ).not.toHaveBeenCalled();
    });
  });

  describe('sanction', () => {
    it('should move APPROVED to SANCTIONED and create audit log', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'APPROVED',
      });

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'SANCTIONED',
      });

      const result = await service.sanction(
        'application-1',
      );

      expect(result.status).toBe('SANCTIONED');

      expect(
        prismaMock.applicationStatusHistory.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          status: 'SANCTIONED',
        },
      });

      expect(
        prismaMock.auditLog.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          action: 'APPLICATION_STATUS_CHANGED',
          entityType: 'Application',
          entityId: 'application-1',
          oldValue: {
            status: 'APPROVED',
          },
          newValue: {
            status: 'SANCTIONED',
          },
        },
      });
    });

    it('should reject sanction when application is not approved', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'UNDER_REVIEW',
      });

      await expect(
        service.sanction('application-1'),
      ).rejects.toThrow(
        'Only approved applications can be sanctioned',
      );

      expect(
        prismaMock.auditLog.create,
      ).not.toHaveBeenCalled();
    });
  });

  describe('disburse', () => {
    it('should move SANCTIONED to DISBURSED and create audit log', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'SANCTIONED',
      });

      prismaMock.application.update.mockResolvedValue({
        id: 'application-1',
        status: 'DISBURSED',
      });

      const result = await service.disburse(
        'application-1',
      );

      expect(result.status).toBe('DISBURSED');

      expect(
        prismaMock.applicationStatusHistory.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          status: 'DISBURSED',
        },
      });

      expect(
        prismaMock.auditLog.create,
      ).toHaveBeenCalledWith({
        data: {
          applicationId: 'application-1',
          action: 'APPLICATION_STATUS_CHANGED',
          entityType: 'Application',
          entityId: 'application-1',
          oldValue: {
            status: 'SANCTIONED',
          },
          newValue: {
            status: 'DISBURSED',
          },
        },
      });
    });

    it('should reject disbursement when application is not sanctioned', async () => {
      prismaMock.application.findUnique.mockResolvedValue({
        id: 'application-1',
        status: 'APPROVED',
      });

      await expect(
        service.disburse('application-1'),
      ).rejects.toThrow(
        'Only sanctioned applications can be disbursed',
      );

      expect(
        prismaMock.auditLog.create,
      ).not.toHaveBeenCalled();
    });
  });

  it('should throw when application does not exist', async () => {
    prismaMock.application.findUnique.mockResolvedValue(
      null,
    );

    await expect(
      service.approve('missing-application'),
    ).rejects.toThrow(
      'Application with ID missing-application not found',
    );

    expect(
      prismaMock.auditLog.create,
    ).not.toHaveBeenCalled();
  });
});