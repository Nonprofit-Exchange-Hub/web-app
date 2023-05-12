import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { User } from './acccount-manager/entities/user.entity';
import { PocChat } from './poc-chat/entities/poc-chat.entity';
import { Asset } from './assets/entities/asset.entity';
import { Category } from './categories/entities/category.entity';
import { Organization } from './organizations/entities/organization.entity';
import { UserOrganization } from './user-org/entities/user-org.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { Message } from './messages/entities/message.entity';
import { Initial1683853418536, addsearchtitleindex1683853679000 } from './migrations';
dotenv.config();
@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: false, //shouldn't be used in production
      dropSchema: false, //toggle to true to clear database schema
      logging: true,
      autoLoadEntities: true,
      entities: [
        User,
        Category,
        Organization,
        UserOrganization,
        Transaction,
        Asset,
        PocChat,
        Message,
      ],
      migrations: [Initial1683853418536, addsearchtitleindex1683853679000],
      ssl:
        process.env.MODE === 'production' // only require ssl when in production/
          ? {
              ca: process.env.POSTGRESQL_SSL_CA ?? '',
              cert: process.env.POSTGRESQL_SSL_CERT ?? '',
              key: process.env.POSTGRESQL_SSL_KEY ?? '',
              rejectUnauthorized: false,
            }
          : false,
    };
  }
}
