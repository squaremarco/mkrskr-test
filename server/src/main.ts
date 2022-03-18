import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () =>
    Logger.log(`Listening at http://localhost:${port}`)
  );
}

bootstrap();
