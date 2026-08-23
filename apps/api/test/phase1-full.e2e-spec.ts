jest.setTimeout(60000);

import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from './../src/auth/jwt-auth.guard';
import { PrismaService } from './../prisma/prisma.service';
import { UserRole } from './../src/auth/roles.decorator';

describe('Phase 1 Full E2E Journey', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  let userId: string;
  let customerId: string;
  let leadId: string;
  let applicationId: string;

  let lenderId: string;
  let productId: string;
  let offerId: string;

  let panDocumentId: string;
  let incomeDocumentId: string;

  const testUser = {
    sub: 'phase1-e2e-user',
    customerId: '',
    phone: '9000000001',
    role: UserRole.ADMIN,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideGuard(JwtAuthGuard)
        .useValue({
          canActivate: (context: any) => {
            const req =
              context.switchToHttp().getRequest();

            req.user = {
              ...testUser,
              customerId,
            };

            return true;
          },
        })
        .compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    prisma = app.get(PrismaService);

    // -------------------------------------------------
    // Test customer + user
    // -------------------------------------------------

    const user = await prisma.user.create({
      data: {
        phone: `900${Date.now()}`,
        role: 'CUSTOMER',
      },
    });

    userId = user.id;

    const customer =
      await prisma.customer.create({
        data: {
          userId,
        },
      });

    customerId = customer.id;

    // -------------------------------------------------
    // Test lender
    // -------------------------------------------------

    const lender =
      await prisma.lender.create({
        data: {
          name: 'Phase 1 E2E Bank',
          code: `PHASE1_${Date.now()}`,
          status: 'ACTIVE',
        },
      });

    lenderId = lender.id;

    // -------------------------------------------------
    // Test product
    // -------------------------------------------------

    const product =
      await prisma.lenderProduct.create({
        data: {
          lenderId,
          name: 'Phase 1 Personal Loan',
          code: `PHASE1_PL_${Date.now()}`,
          status: 'ACTIVE',
          minAmount: 50000,
          maxAmount: 2000000,
          minTenure: 12,
          maxTenure: 60,
        },
      });

    productId = product.id;

    // -------------------------------------------------
    // Eligibility rules
    // -------------------------------------------------

    await prisma.lenderRule.createMany({
      data: [
        {
          lenderId,
          productId,
          name: 'Minimum Credit Score',
          version: 1,
          isActive: true,
          ruleType: 'CREDIT_SCORE',
          ruleConfig: {
            minimum: 650,
          },
        },
        {
          lenderId,
          productId,
          name: 'Minimum Income',
          version: 1,
          isActive: true,
          ruleType: 'MIN_INCOME',
          ruleConfig: {
            minimum: 15000,
          },
        },
        {
          lenderId,
          productId,
          name: 'Maximum Amount',
          version: 1,
          isActive: true,
          ruleType: 'MAX_AMOUNT',
          ruleConfig: {
            maximum: 2000000,
          },
        },
        {
          lenderId,
          productId,
          name: 'Interest Rate',
          version: 1,
          isActive: true,
          ruleType: 'INTEREST_RATE',
          ruleConfig: {
            rate: 10.75,
          },
        },
      ],
    });
  });

  it('should complete the complete Phase 1 journey', async () => {
    // -------------------------------------------------
    // 1. Lead
    // -------------------------------------------------

    const leadResponse = await request(
      app.getHttpServer(),
    )
      .post('/api/v1/leads')
      .send({
        customerId,
        source: 'PHASE1_E2E',
      })
      .expect(201);

    leadId = leadResponse.body.id;

    expect(leadResponse.body.customerId).toBe(
      customerId,
    );

    // -------------------------------------------------
    // 2. Application
    // -------------------------------------------------

    const applicationResponse =
      await request(app.getHttpServer())
        .post('/api/v1/applications')
        .send({
          customerId,
          leadId,
          loanType: 'PERSONAL',
          amount: 500000,
          tenure: 60,
        })
        .expect(201);

    applicationId =
      applicationResponse.body.id;

    expect(
      applicationResponse.body.customerId,
    ).toBe(customerId);

    expect(
      applicationResponse.body.status,
    ).toBe('LEAD');

    // -------------------------------------------------
    // 3. Eligibility
    // -------------------------------------------------

    const eligibilityResponse =
      await request(app.getHttpServer())
        .post('/api/v1/eligibility/check')
        .send({
          customerId,
          applicationId,
          loanType: 'PERSONAL',
          requestedAmount: 500000,
          tenureMonths: 60,
          monthlyIncome: 50000,
          employmentType: 'SALARIED',
          age: 25,
          creditScore: 750,
        })
        .expect(201);

    expect(
      eligibilityResponse.body.eligible,
    ).toBe(true);

    expect(
      eligibilityResponse.body.count,
    ).toBe(1);

    // -------------------------------------------------
    // 4. Lender matching
    // -------------------------------------------------

    const matchResponse =
      await request(app.getHttpServer())
        .post('/api/v1/lender-matching/match')
        .send({
          customerId,
          applicationId,
          loanType: 'PERSONAL',
          requestedAmount: 500000,
          tenureMonths: 60,
          monthlyIncome: 50000,
          employmentType: 'SALARIED',
          creditScore: 750,
        })
        .expect(201);

    expect(
      matchResponse.body.count,
    ).toBeGreaterThanOrEqual(1);

    expect(
      matchResponse.body.matchedProducts.length,
    ).toBeGreaterThanOrEqual(1);

    // -------------------------------------------------
    // 5. Generate offers
    // -------------------------------------------------

    const generateOfferResponse =
      await request(app.getHttpServer())
        .post('/api/v1/loan-offers/generate')
        .send({
          applicationId,
        })
        .expect(201);

    expect(
      generateOfferResponse.body.count,
    ).toBe(1);

    offerId =
      generateOfferResponse.body.offers[0].id;

    expect(
      generateOfferResponse.body.offers[0].status,
    ).toBe('GENERATED');

    // Application should now be LENDER_MATCHED.
    let application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'LENDER_MATCHED',
    );

    // -------------------------------------------------
    // 6. Present offer
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(`/api/v1/loan-offers/${offerId}/present`)
      .expect(200);

    application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'OFFER_PRESENTED',
    );

    // -------------------------------------------------
    // 7. Select offer
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(`/api/v1/loan-offers/${offerId}/select`)
      .expect(200);

    application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'CUSTOMER_SELECTED',
    );

    // -------------------------------------------------
    // 8. Upload PAN
    // -------------------------------------------------

    const panResponse =
      await request(app.getHttpServer())
        .post('/api/v1/documents')
        .send({
          applicationId,
          documentType: 'PAN_CARD',
          fileName: 'pan-card.pdf',
          fileUrl: 'local://phase1/pan-card.pdf',
        })
        .expect(201);

    panDocumentId = panResponse.body.id;

    expect(
      panResponse.body.status,
    ).toBe('UPLOADED');

    // -------------------------------------------------
    // 9. Upload income proof
    // -------------------------------------------------

    const incomeResponse =
      await request(app.getHttpServer())
        .post('/api/v1/documents')
        .send({
          applicationId,
          documentType: 'INCOME_PROOF',
          fileName: 'income-proof.pdf',
          fileUrl:
            'local://phase1/income-proof.pdf',
        })
        .expect(201);

    incomeDocumentId =
      incomeResponse.body.id;

    expect(
      incomeResponse.body.status,
    ).toBe('UPLOADED');

    // -------------------------------------------------
    // 10. Verify PAN
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(
        `/api/v1/documents/${panDocumentId}/verify`,
      )
      .expect(200);

    // -------------------------------------------------
    // 11. Verify income proof
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(
        `/api/v1/documents/${incomeDocumentId}/verify`,
      )
      .expect(200);

    // -------------------------------------------------
    // 12. KYC
    // -------------------------------------------------

    const kycResponse =
      await request(app.getHttpServer())
        .patch(
          `/api/v1/documents/application/${applicationId}/complete`,
        )
        .expect(200);

    expect(kycResponse.body.status).toBe(
      'KYC',
    );

    application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'KYC',
    );

    // -------------------------------------------------
    // 13. Submit to lender
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(
        `/api/v1/applications/${applicationId}/submit-to-lender`,
      )
      .expect(200);

    application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'LENDER_SUBMITTED',
    );

    // -------------------------------------------------
    // 14. Start review
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(
        `/api/v1/applications/${applicationId}/start-review`,
      )
      .expect(200);

    application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'UNDER_REVIEW',
    );

    // -------------------------------------------------
    // 15. Approve
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(
        `/api/v1/applications/${applicationId}/approve`,
      )
      .expect(200);

    application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'APPROVED',
    );

    // -------------------------------------------------
    // 16. Sanction
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(
        `/api/v1/applications/${applicationId}/sanction`,
      )
      .expect(200);

    application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(application?.status).toBe(
      'SANCTIONED',
    );

    // -------------------------------------------------
    // 17. Disburse
    // -------------------------------------------------

    await request(app.getHttpServer())
      .patch(
        `/api/v1/applications/${applicationId}/disburse`,
      )
      .expect(200);

    // -------------------------------------------------
    // 18. Final database verification
    // -------------------------------------------------

    const finalApplication =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(
      finalApplication?.status,
    ).toBe('DISBURSED');

    // Status history
    const history =
      await prisma.applicationStatusHistory.findMany({
        where: {
          applicationId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

    const statuses = history.map(
      (item) => item.status,
    );

    expect(statuses).toEqual(
      expect.arrayContaining([
        'LENDER_MATCHED',
        'OFFER_PRESENTED',
        'CUSTOMER_SELECTED',
        'KYC',
        'LENDER_SUBMITTED',
        'UNDER_REVIEW',
        'APPROVED',
        'SANCTIONED',
        'DISBURSED',
      ]),
    );

    // Audit logs
    const auditLogs =
      await prisma.auditLog.findMany({
        where: {
          applicationId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

    expect(auditLogs.length).toBeGreaterThanOrEqual(
      5,
    );

    expect(
      auditLogs.map(
        (log) => log.newValue,
      ),
    ).toEqual(
      expect.arrayContaining([
        {
          status: 'LENDER_SUBMITTED',
        },
        {
          status: 'UNDER_REVIEW',
        },
        {
          status: 'APPROVED',
        },
        {
          status: 'SANCTIONED',
        },
        {
          status: 'DISBURSED',
        },
      ]),
    );
  });

  afterAll(async () => {
    if (applicationId) {
      await prisma.document.deleteMany({
        where: {
          applicationId,
        },
      });

      await prisma.auditLog.deleteMany({
        where: {
          applicationId,
        },
      });

      await prisma.applicationStatusHistory.deleteMany({
        where: {
          applicationId,
        },
      });

      await prisma.loanOffer.deleteMany({
        where: {
          applicationId,
        },
      });

      await prisma.eligibilityCheck.deleteMany({
        where: {
          applicationId,
        },
      });

      await prisma.application.delete({
        where: {
          id: applicationId,
        },
      });
    }

    if (leadId) {
      await prisma.lead.delete({
        where: {
          id: leadId,
        },
      });
    }

    if (productId) {
      await prisma.lenderRule.deleteMany({
        where: {
          productId,
        },
      });

      await prisma.lenderProduct.delete({
        where: {
          id: productId,
        },
      });
    }

    if (lenderId) {
      await prisma.lender.delete({
        where: {
          id: lenderId,
        },
      });
    }

    if (customerId) {
      await prisma.customer.delete({
        where: {
          id: customerId,
        },
      });
    }

    if (userId) {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    }

    await app.close();
  });
});