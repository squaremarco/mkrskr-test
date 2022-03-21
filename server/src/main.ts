import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors({ credentials: true, origin: 'http://localhost:4000' });
  app.use(helmet());
  app.use(cookieParser());

  await app.listen(port, () =>
    Logger.log(`Listening at http://localhost:${port}`)
  );
}

bootstrap();
