import { Test, TestingModule } from '@nestjs/testing';
import { LendersController } from './lenders.controller';

describe('LendersController', () => {
  let controller: LendersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LendersController],
    }).compile();

    controller = module.get<LendersController>(LendersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
