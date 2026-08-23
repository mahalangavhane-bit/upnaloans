import { Test, TestingModule } from '@nestjs/testing';
import { LenderProductsController } from './lender-products.controller';

describe('LenderProductsController', () => {
  let controller: LenderProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenderProductsController],
    }).compile();

    controller = module.get<LenderProductsController>(LenderProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
