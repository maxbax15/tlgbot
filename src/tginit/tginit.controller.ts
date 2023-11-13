import { Controller } from '@nestjs/common';
import { TginitService } from './tginit.service';

@Controller('tginit')
export class TginitController {
  constructor(private readonly tginitService: TginitService) {}
  initBot() {
    this.tginitService.init();
  }
}
