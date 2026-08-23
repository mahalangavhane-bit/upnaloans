jest.setTimeout(30000);

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

describe('Loan Offers API integration (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  let customerId: string;
  let applicationId: string;
  let lenderId: string;
  let productId: string;
  let eligibilityCheckId: string;
  let offerId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideGuard(JwtAuthGuard)
        .useValue({
          canActivate: () => true,
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

    // 1. Customer
    const customer = await prisma.customer.create({
      data: {},
    });

    customerId = customer.id;

    // 2. Application
    const application =
      await prisma.application.create({
        data: {
          customerId,
          loanType: 'PERSONAL',
          amount: 500000,
          tenure: 60,
          status: 'ELIGIBILITY_CHECK',
        },
      });

    applicationId = application.id;

    // 3. Lender
    const lender = await prisma.lender.create({
      data: {
        name: 'Test Loan Bank',
        code: `TEST_LOAN_${Date.now()}`,
        status: 'ACTIVE',
      },
    });

    lenderId = lender.id;

    // 4. Lender Product
    const product =
      await prisma.lenderProduct.create({
        data: {
          lenderId,
          name: 'Test Personal Loan',
          code: `TEST_PL_${Date.now()}`,
          status: 'ACTIVE',
          minAmount: 50000,
          maxAmount: 2000000,
          minTenure: 12,
          maxTenure: 60,
        },
      });

    productId = product.id;

    // 5. Interest-rate rule
    await prisma.lenderRule.create({
      data: {
        lenderId,
        productId,
        name: 'Test Interest Rate',
        version: 1,
        isActive: true,
        ruleType: 'INTEREST_RATE',
        ruleConfig: {
          rate: 10.75,
        },
      },
    });

    // 6. Eligible eligibility-check record
    const eligibilityCheck =
      await prisma.eligibilityCheck.create({
        data: {
          applicationId,
          lenderId,
          productId,
          status: 'ELIGIBLE',
          ruleVersion: 1,
          details: {
            source: 'e2e-test',
          },
        },
      });

    eligibilityCheckId =
      eligibilityCheck.id;
  });

  it('should generate a loan offer and persist EMI in PostgreSQL', async () => {
    const response = await request(
      app.getHttpServer(),
    )
      .post(
        `/api/v1/loan-offers/generate`,
      )
      .send({
        applicationId,
      })
      .expect(201);

    expect(response.body.applicationId).toBe(
      applicationId,
    );

    expect(response.body.count).toBe(1);

    expect(response.body.offers).toHaveLength(1);

    const offer = response.body.offers[0];

    expect(offer.lenderId).toBe(lenderId);
    expect(offer.productId).toBe(productId);
    expect(offer.status).toBe('GENERATED');
    expect(Number(offer.amount)).toBe(500000);
    expect(Number(offer.interestRate)).toBe(10.75);
    expect(offer.tenure).toBe(60);

    // Expected EMI for ₹5,00,000 @ 10.75% for 60 months.
    expect(Number(offer.monthlyEmi)).toBeCloseTo(
      10808.98,
      2,
    );

    offerId = offer.id;

    // Verify the actual database record.
    const savedOffer =
      await prisma.loanOffer.findUnique({
        where: {
          id: offerId,
        },
      });

    expect(savedOffer).not.toBeNull();

    expect(savedOffer?.applicationId).toBe(
      applicationId,
    );

    expect(savedOffer?.lenderId).toBe(
      lenderId,
    );

    expect(savedOffer?.productId).toBe(
      productId,
    );

    expect(savedOffer?.status).toBe(
      'GENERATED',
    );

    expect(
      Number(savedOffer?.monthlyEmi),
    ).toBeCloseTo(10808.98, 2);
  });

  afterAll(async () => {
    // Delete in foreign-key-safe order.
    if (offerId) {
      await prisma.loanOffer.delete({
        where: {
          id: offerId,
        },
      });
    }

    if (eligibilityCheckId) {
      await prisma.eligibilityCheck.delete({
        where: {
          id: eligibilityCheckId,
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

    if (applicationId) {
      await prisma.applicationStatusHistory.deleteMany({
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

    if (customerId) {
      await prisma.customer.delete({
        where: {
          id: customerId,
        },
      });
    }

    await app.close();
  });
});