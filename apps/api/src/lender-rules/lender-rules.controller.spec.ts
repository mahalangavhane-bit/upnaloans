import { Test, TestingModule } from '@nestjs/testing';
import { LenderRulesController } from './lender-rules.controller';

describe('LenderRulesController', () => {
  let controller: LenderRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenderRulesController],
    }).compile();

    controller = module.get<LenderRulesController>(LenderRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
