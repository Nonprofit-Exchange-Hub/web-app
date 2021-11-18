import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConnectionService } from './database-connection.service';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    AssetsModule,
    MessagesModule,
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/build'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}