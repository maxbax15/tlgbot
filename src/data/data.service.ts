import { Injectable } from '@nestjs/common';
import { MenuItem, TelegrafContext } from 'src/types';

@Injectable()
export class DataService {
  // получить пункты меню для использования ботом
  getMenuItems(): MenuItem[] {
    return [
      { id: 1, name: 'item 1', parent_id: 0 },
      { id: 2, name: 'item 2', parent_id: 0 },
      { id: 3, name: 'item 3', parent_id: 0 },
      { id: 4, name: 'item 2.1', parent_id: 2 },
      { id: 5, name: 'item 2.2', parent_id: 2 },
      { id: 6, name: 'item 2.2.1', parent_id: 5 },
      { id: 7, name: 'item 2.2.2', parent_id: 5 },
    ];
  }
  // выбранный пункт
  chosenItem: MenuItem;
  sendChosenItem(cItem: MenuItem, ctx?: TelegrafContext): MenuItem {
    ctx.reply(`Ваш выбор: ${cItem.name}`);
    return cItem;
  }
}
