jest.setTimeout(30000);
import {
  INestApplication,
} from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from './../src/auth/jwt-auth.guard';
import { PrismaService } from './../prisma/prisma.service';

describe('Application API integration (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  let customerId: string;
  let applicationId: string;

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
    await app.init();

    prisma = app.get(PrismaService);

    // Create test customer directly in the test database.
    const customer = await prisma.customer.create({
      data: {},
    });

    customerId = customer.id;
  });

  it('should create an application and persist it in PostgreSQL', async () => {
    const response = await request(
      app.getHttpServer(),
    )
      .post('/applications')
      .send({
        customerId,
        leadId: null,
        loanType: 'PERSONAL',
        amount: 500000,
        tenure: 60,
      })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        customerId,
        loanType: 'PERSONAL',
        tenure: 60,
        status: 'LEAD',
      }),
    );

    applicationId = response.body.id;

    // Verify the actual PostgreSQL row.
    const savedApplication =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    expect(savedApplication).not.toBeNull();
    expect(savedApplication?.customerId).toBe(
      customerId,
    );
    expect(savedApplication?.loanType).toBe(
      'PERSONAL',
    );
    expect(savedApplication?.tenure).toBe(60);
  });

  afterAll(async () => {
    if (applicationId) {
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