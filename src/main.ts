import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();

    app.useStaticAssets(resolve('./src/public'));
    app.setBaseViewsDir(resolve('./src/views'));
    app.setViewEngine('hbs');

    await app.listen(process.env.PORT || 3001);
}
bootstrap();
