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
import { UserRole } from './../src/auth/roles.decorator';
import { PrismaService } from './../prisma/prisma.service';

describe('Customers RBAC (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

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

            const role =
              req.headers['x-test-role'];

            req.user = {
              sub: `test-user-${role}`,
              customerId: `test-customer-${role}`,
              phone: '9999999999',
              role,
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
  });

  function getAs(role: UserRole) {
    return request(app.getHttpServer())
      .get('/api/v1/customers')
      .set('x-test-role', role);
  }

  function postAs(role: UserRole) {
    return request(app.getHttpServer())
      .post('/api/v1/customers')
      .set('x-test-role', role);
  }

  function deleteAs(
    role: UserRole,
    customerId: string,
  ) {
    return request(app.getHttpServer())
      .delete(
        `/api/v1/customers/${customerId}`,
      )
      .set('x-test-role', role);
  }

  it('CUSTOMER should be forbidden from POST /customers', async () => {
    await postAs(UserRole.CUSTOMER)
      .send({})
      .expect(403);
  });

  it('AGENT should pass RBAC on POST /customers', async () => {
    const response = await postAs(UserRole.AGENT)
      .send({});

    expect([201, 400]).toContain(
      response.status,
    );
  });

  it('ADMIN should pass RBAC on POST /customers', async () => {
    const response = await postAs(UserRole.ADMIN)
      .send({});

    expect([201, 400]).toContain(
      response.status,
    );
  });

  it('CUSTOMER should be forbidden from GET /customers', async () => {
    await getAs(UserRole.CUSTOMER)
      .expect(403);
  });

  it('AGENT should be allowed on GET /customers', async () => {
    await getAs(UserRole.AGENT)
      .expect(200);
  });

  it('ADMIN should be allowed on GET /customers', async () => {
    await getAs(UserRole.ADMIN)
      .expect(200);
  });

  it('CUSTOMER should be allowed on GET /customers/:id', async () => {
    const customer =
      await prisma.customer.findFirst();

    if (!customer) {
      return;
    }

    await request(app.getHttpServer())
      .get(
        `/api/v1/customers/${customer.id}`,
      )
      .set(
        'x-test-role',
        UserRole.CUSTOMER,
      )
      .expect(200);
  });

  it('AGENT should be forbidden from DELETE /customers/:id', async () => {
    const customer =
      await prisma.customer.findFirst();

    if (!customer) {
      return;
    }

    await deleteAs(
      UserRole.AGENT,
      customer.id,
    ).expect(403);
  });

  it('CUSTOMER should be forbidden from DELETE /customers/:id', async () => {
    const customer =
      await prisma.customer.findFirst();

    if (!customer) {
      return;
    }

    await deleteAs(
      UserRole.CUSTOMER,
      customer.id,
    ).expect(403);
  });

  it('ADMIN should pass RBAC on DELETE /customers/:id', async () => {
    const customer =
      await prisma.customer.findFirst();

    if (!customer) {
      return;
    }

    const response = await deleteAs(
      UserRole.ADMIN,
      customer.id,
    );

    expect([200, 404]).toContain(
      response.status,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});