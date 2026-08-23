import { Test, TestingModule } from '@nestjs/testing';
import { LenderMatchingController } from './lender-matching.controller';

describe('LenderMatchingController', () => {
  let controller: LenderMatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenderMatchingController],
    }).compile();

    controller = module.get<LenderMatchingController>(LenderMatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
