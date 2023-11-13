import { Test, TestingModule } from '@nestjs/testing';
import { TginitController } from './tginit.controller';

describe('TginitController', () => {
  let controller: TginitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TginitController],
    }).compile();

    controller = module.get<TginitController>(TginitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
