import { Context, Scenes } from 'telegraf';
export type SessionMenuItem = { id?: string; name?: string };

export type MenuItem = {
  id: number;
  name: string;
  parent_id: number;
};

interface MyWizardSessionData extends Scenes.WizardSessionData {
  itemparam: SessionMenuItem;
  // itemId: string;
  // itemName: string;
}

export interface TelegrafContext extends Context {
  session: Scenes.WizardSession<MyWizardSessionData>;
  scene: Scenes.SceneContextScene<TelegrafContext, MyWizardSessionData>;
  wizard: Scenes.WizardContextWizard<TelegrafContext>;
}
