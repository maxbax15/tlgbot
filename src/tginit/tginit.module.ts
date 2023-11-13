import { Module } from '@nestjs/common';
import { TginitController } from './tginit.controller';
import { TginitService } from './tginit.service';
import { TgmenuService } from 'src/tgmenu/tgmenu.service';
import { DataService } from 'src/data/data.service';

@Module({
  controllers: [TginitController],
  providers: [TginitService, TgmenuService, DataService],
})
export class TginitModule {}
