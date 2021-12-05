import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe())
    app.useStaticAssets(resolve('./src/public'));
    app.setBaseViewsDir(resolve('./src/views'));
    app.setViewEngine('hbs');

    await app.listen(process.env.PORT || 3001);
}
bootstrap();
