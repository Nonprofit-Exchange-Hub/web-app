import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseConnectionService } from './database-connection.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { UserOrganizationsModule } from './user-org/user-org.module';
import { UsersService } from './users/users.service';

import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/build'),
    }),
    AssetsModule,
    AuthModule,
    MessagesModule,
    OrganizationsModule,
    UsersModule,
    CategoriesModule,
    UserOrganizationsModule,
    TransactionsModule,
    SendgridModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
