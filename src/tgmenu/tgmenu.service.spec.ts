import { Test, TestingModule } from '@nestjs/testing';
import { TgmenuService } from './tgmenu.service';

describe('TgmenuService', () => {
  let service: TgmenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TgmenuService],
    }).compile();

    service = module.get<TgmenuService>(TgmenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
