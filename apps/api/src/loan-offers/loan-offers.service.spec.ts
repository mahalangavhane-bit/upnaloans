jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { Test, TestingModule } from '@nestjs/testing';

import { LoanOffersService } from './loan-offers.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('LoanOffersService', () => {
  let service: LoanOffersService;

  const prismaMock = {};

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          LoanOffersService,
          {
            provide: PrismaService,
            useValue: prismaMock,
          },
        ],
      }).compile();

    service =
      module.get<LoanOffersService>(
        LoanOffersService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateMonthlyEmi', () => {
    it('should calculate HDFC EMI correctly', () => {
      const emi = service.calculateMonthlyEmi(
        500000,
        10.75,
        60,
      );

      expect(emi).toBeCloseTo(10808.98, 2);
    });

    it('should calculate ICICI EMI correctly', () => {
      const emi = service.calculateMonthlyEmi(
        500000,
        11.25,
        60,
      );

      expect(emi).toBeCloseTo(10933.65, 2);
    });

    it('should handle zero interest rate', () => {
      const emi = service.calculateMonthlyEmi(
        500000,
        0,
        60,
      );

      expect(emi).toBeCloseTo(8333.33, 2);
    });

    it('should calculate EMI correctly for a different amount', () => {
      const emi = service.calculateMonthlyEmi(
        100000,
        12,
        12,
      );

      expect(emi).toBeCloseTo(8884.88, 2);
    });

    it('should return the principal divided by tenure for zero interest', () => {
      const emi = service.calculateMonthlyEmi(
        120000,
        0,
        12,
      );

      expect(emi).toBe(10000);
    });
  });
});