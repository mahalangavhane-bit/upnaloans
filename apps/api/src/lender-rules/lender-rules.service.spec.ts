import { Test, TestingModule } from '@nestjs/testing';
import { LenderRulesService } from './lender-rules.service';

describe('LenderRulesService', () => {
  let service: LenderRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenderRulesService],
    }).compile();

    service = module.get<LenderRulesService>(LenderRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
