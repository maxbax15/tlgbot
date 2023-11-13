import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TginitController } from './tginit/tginit.controller';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tgController = app.get(TginitController);
  tgController.initBot();
  console.log('tginit is starting now ...');
}
bootstrap();
