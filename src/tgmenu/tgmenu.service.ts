import { Injectable } from '@nestjs/common';
import {
  CANCEL_MENU_ITEM_ID,
  CANCEL_MENU_ITEM_NAME,
  MAIN_MENU_ITEM_ID,
  MAIN_MENU_ITEM_NAME,
} from 'src/botConfig';
import { DataService } from 'src/data/data.service';
import { MenuItem, SessionMenuItem, TelegrafContext } from 'src/types';
import { Markup, Scenes } from 'telegraf';
import { CallbackQuery, InlineKeyboardButton } from 'typegram';
type extCBQuery = CallbackQuery & { data: string };

@Injectable()
export class TgmenuService {
  constructor(private readonly dataservice: DataService) {}
  // Добавление к имени пункта меню символов >>, если пункт имеет вложенное меню
  private prepareMenu = (items: MenuItem[]) => {
    return items.map((item) => {
      if (
        items.some((itm) => {
          return item.id == itm.parent_id;
        })
      ) {
        item.name = item.name + ' >>';
      }
      return item;
    });
  };

  showMenu(items: MenuItem[]) {
    const mi = this.prepareMenu(items);
    return new Scenes.WizardScene<TelegrafContext>(
      'menu',
      async (ctx) => {
        const iKbd: InlineKeyboardButton.CallbackButton[][] = [];
        ctx.scene.session.itemparam = ctx.scene.session.itemparam
          ? ctx.scene.session.itemparam
          : ({} as SessionMenuItem);
        ctx.scene.session.itemparam.id = ctx.scene.session.itemparam.id
          ? ctx.scene.session.itemparam.id
          : MAIN_MENU_ITEM_ID;
        ctx.scene.session.itemparam.name = ctx.scene.session.itemparam.name
          ? ctx.scene.session.itemparam.name
          : MAIN_MENU_ITEM_NAME;
        const chosenMenuItems = mi.filter((item) => {
          return item.parent_id == Number(ctx.scene.session.itemparam.id);
        });
        // добавление кнопки отмены и кнопок возврата для вложенных меню
        if (ctx.scene.session.itemparam.id !== MAIN_MENU_ITEM_ID) {
          chosenMenuItems.push({
            id: mi.find((mnItem) => {
              return mnItem.id == chosenMenuItems[0].parent_id;
            }).parent_id,
            name: '<<',
            parent_id: 0,
          });
        } else {
          chosenMenuItems.push({
            id: -1,
            name: 'Отмена',
            parent_id: 0,
          });
        }
        for (const e of chosenMenuItems) {
          iKbd.push([Markup.button.callback(e.name, `${e.id}`)]);
        }
        await ctx.reply(
          ctx.scene.session.itemparam.name,
          Markup.inlineKeyboard(iKbd),
        );
        ctx.wizard.next();
      },
      async (ctx) => {
        ctx.reply('the end');
        ctx.scene.leave();
      },
    ).action(/[0-9]|-1/, async (ctx, done) => {
      ctx.scene.session.itemparam.id = (ctx.callbackQuery as extCBQuery).data;
      switch (ctx.scene.session.itemparam.id) {
        case MAIN_MENU_ITEM_ID:
          ctx.scene.session.itemparam.name = MAIN_MENU_ITEM_NAME;
          break;
        case CANCEL_MENU_ITEM_ID:
          ctx.scene.session.itemparam.name = CANCEL_MENU_ITEM_NAME;
          break;
        default:
          ctx.scene.session.itemparam.name = mi.find((mitem) => {
            return mitem.id == Number(ctx.scene.session.itemparam.id);
          }).name;
          break;
      }
      if (
        mi.findIndex((mitem) => {
          return mitem.parent_id == Number(ctx.scene.session.itemparam.id);
        }) < 0
      ) {
        // передача результата выбора
        this.dataservice.sendChosenItem(
          {
            id: Number(ctx.scene.session.itemparam.id),
            name: ctx.scene.session.itemparam.name,
            parent_id: 0,
          },
          ctx,
        );
        ctx.wizard.next();
      } else {
        ctx.wizard.selectStep(0);
      }
      return done();
    });
  }
}
