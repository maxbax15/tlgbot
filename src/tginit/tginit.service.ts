import { Injectable } from '@nestjs/common';
import { BOT_TOKEN } from 'src/botConfig';
import { DataService } from 'src/data/data.service';
import { TgmenuService } from 'src/tgmenu/tgmenu.service';
import { TelegrafContext } from 'src/types';
import { Scenes, Telegraf, session } from 'telegraf';
import { BotCommand } from 'telegraf/typings/core/types/typegram';

const myBotCommands: BotCommand[] = [
  {
    command: 'menu',
    description: 'Меню',
  },
  {
    command: 'help',
    description: 'справка',
  },
  {
    command: 'start',
    description: 'старт',
  },
];
@Injectable()
export class TginitService {
  constructor(
    private readonly tgmenu: TgmenuService,
    private readonly dataservice: DataService,
  ) {}
  private readonly bot = new Telegraf<TelegrafContext>(BOT_TOKEN);
  init() {
    this.bot.telegram.setMyCommands(myBotCommands);
    const stage = new Scenes.Stage([
      this.tgmenu.showMenu(this.dataservice.getMenuItems()),
    ]);
    this.bot.use(session());
    this.bot.use(stage.middleware());
    this.bot.start((ctx) => {
      ctx.reply('Welcome');
    });
    this.bot.help((ctx) => {
      ctx.reply(
        '<b>Бот для демонстрации многоуровнего меню.</b>\n\n' +
          'Данные для пунктов меню предоставляюся сервисом Dataservice и должны иметь тип MenuItem (types.ts).\n\n' +
          'Многоуровневость меню обеспечивается рекурсивными ссылками пунктов.\n\n' +
          'data.service.ts содержит тест реализацию сервиса с простейшими функциями:\n' +
          '- получения данных по пунктам меню для тестирования.\n' +
          '- передачи результата выбора.\n\n' +
          'Выберите в меню бота команду /menu.',
        { parse_mode: 'HTML' }
      );
    });
    this.bot.command('menu', (ctx) => {
      ctx.scene.enter('menu');
    });
    this.bot.launch();
  }
}
