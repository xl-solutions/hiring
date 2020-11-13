import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';

import * as config from 'config';

import { ServerConfig } from './interfaces';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {
    server: { port },
    cors: { origin },
  } = config.get<ServerConfig>('config');

  app.use(cors({ origin: process.env.ORIGIN || origin }));

  await app.listen(process.env.PORT || port);
}

bootstrap();
