import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

dotenv.config({ path: __dirname + '/.env' });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    // TODO get env related base url
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');
  app.use(cookieParser('secret_placeholder'));

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
