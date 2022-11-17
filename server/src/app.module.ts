import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseConnectionService } from './database-connection.service';
import { AppController } from './app.controller';
import { AssetsModule } from './assets/assets.module';
import { MessagesModule } from './messages/messages.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { UserOrganizationsModule } from './user-org/user-org.module';
import { PocChatModule } from './poc-chat/poc-chat.module';
import { FilesService } from './files/files.service';
import { AccountManagerModule } from './account-manager/account-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/../../client', 'build'),
    }),
    AccountManagerModule,
    AssetsModule,
    MessagesModule,
    OrganizationsModule,
    CategoriesModule,
    UserOrganizationsModule,
    TransactionsModule,
    PocChatModule,
    AccountManagerModule,
  ],
  controllers: [AppController],
  providers: [FilesService],
})
export class AppModule {}
