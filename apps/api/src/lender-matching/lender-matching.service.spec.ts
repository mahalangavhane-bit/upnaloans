import { Test, TestingModule } from '@nestjs/testing';
import { LenderMatchingService } from './lender-matching.service';

describe('LenderMatchingService', () => {
  let service: LenderMatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenderMatchingService],
    }).compile();

    service = module.get<LenderMatchingService>(LenderMatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
