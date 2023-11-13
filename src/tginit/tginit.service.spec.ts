import { Test, TestingModule } from '@nestjs/testing';
import { TginitService } from './tginit.service';

describe('TginitService', () => {
  let service: TginitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TginitService],
    }).compile();

    service = module.get<TginitService>(TginitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
