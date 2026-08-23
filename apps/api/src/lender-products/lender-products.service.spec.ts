import { Test, TestingModule } from '@nestjs/testing';
import { LenderProductsService } from './lender-products.service';

describe('LenderProductsService', () => {
  let service: LenderProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenderProductsService],
    }).compile();

    service = module.get<LenderProductsService>(LenderProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
