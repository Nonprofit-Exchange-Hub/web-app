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
import { SendgridService } from './sendgrid/sendgrid.service';
import { AcccountManagerModule } from './acccount-manager/acccount-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/../../client', 'build'),
    }),
    AssetsModule,
    AcccountManagerModule,
    MessagesModule,
    OrganizationsModule,
    CategoriesModule,
    UserOrganizationsModule,
    TransactionsModule,
    PocChatModule,
    AcccountManagerModule,
  ],
  controllers: [AppController],
  providers: [SendgridService],
})
export class AppModule {}
