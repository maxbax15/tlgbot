import { Module } from '@nestjs/common';
import { TginitModule } from './tginit/tginit.module';
import { TgmenuService } from './tgmenu/tgmenu.service';
import { DataService } from './data/data.service';

@Module({
  imports: [TginitModule],
  controllers: [],
  providers: [TgmenuService, DataService],
})
export class AppModule {}
