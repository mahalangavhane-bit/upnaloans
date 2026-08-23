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

describe('Eligibility API integration (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  let customerId: string;
  let applicationId: string;
  let lenderId: string;
  let productId: string;

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

    // Create customer
    const customer = await prisma.customer.create({
      data: {},
    });

    customerId = customer.id;

    // Create application
    const application =
      await prisma.application.create({
        data: {
          customerId,
          loanType: 'PERSONAL',
          amount: 500000,
          tenure: 60,
        },
      });

    applicationId = application.id;

    // Create lender
    const lender = await prisma.lender.create({
      data: {
        name: 'Test Bank',
        code: `TEST_${Date.now()}`,
        status: 'ACTIVE',
      },
    });

    lenderId = lender.id;

    // Create lender product
    const product =
      await prisma.lenderProduct.create({
        data: {
          lenderId,
          name: 'Test Personal Loan',
          code: `TEST_PRODUCT_${Date.now()}`,
          status: 'ACTIVE',
          minAmount: 50000,
          maxAmount: 2000000,
          minTenure: 12,
          maxTenure: 60,
        },
      });

    productId = product.id;

    // Credit score rule
    await prisma.lenderRule.create({
      data: {
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
    });

    // Minimum income rule
    await prisma.lenderRule.create({
      data: {
        lenderId,
        productId,
        name: 'Minimum Monthly Income',
        version: 1,
        isActive: true,
        ruleType: 'MIN_INCOME',
        ruleConfig: {
          minimum: 15000,
        },
      },
    });

    // Maximum amount rule
    await prisma.lenderRule.create({
      data: {
        lenderId,
        productId,
        name: 'Maximum Loan Amount',
        version: 1,
        isActive: true,
        ruleType: 'MAX_AMOUNT',
        ruleConfig: {
          maximum: 2000000,
        },
      },
    });
  });

  it('should evaluate eligibility and persist the eligibility check', async () => {
    const response = await request(
      app.getHttpServer(),
    )
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

    expect(response.body.eligible).toBe(true);
    expect(response.body.count).toBe(1);

    expect(
      response.body.eligibleProducts,
    ).toHaveLength(1);

    expect(
      response.body.eligibleProducts[0].lender.id,
    ).toBe(lenderId);

    expect(
      response.body.eligibleProducts[0].product.id,
    ).toBe(productId);

    // Verify EligibilityCheck was persisted
    const savedCheck =
      await prisma.eligibilityCheck.findFirst({
        where: {
          applicationId,
          lenderId,
          productId,
        },
      });

    expect(savedCheck).not.toBeNull();
    expect(savedCheck?.status).toBe('ELIGIBLE');

    // Verify application status
    const updatedApplication =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(updatedApplication?.status).toBe(
      'ELIGIBILITY_CHECK',
    );

    // Verify status history
    const history =
      await prisma.applicationStatusHistory.findMany({
        where: {
          applicationId,
          status: 'ELIGIBILITY_CHECK',
        },
      });

    expect(history).toHaveLength(1);
  });

  afterAll(async () => {
    await prisma.eligibilityCheck.deleteMany({
      where: {
        applicationId,
      },
    });

    await prisma.lenderRule.deleteMany({
      where: {
        lenderId,
      },
    });

    await prisma.lenderProduct.deleteMany({
      where: {
        id: productId,
      },
    });

    await prisma.lender.deleteMany({
      where: {
        id: lenderId,
      },
    });

    await prisma.applicationStatusHistory.deleteMany({
      where: {
        applicationId,
      },
    });

    await prisma.application.deleteMany({
      where: {
        id: applicationId,
      },
    });

    await prisma.customer.deleteMany({
      where: {
        id: customerId,
      },
    });

    await app.close();
  });
});