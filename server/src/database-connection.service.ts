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
import { Init1683855028140, addsearchtitleindex1683855184000 } from './migrations';
dotenv.config();

export type AppEnvironment = 'staging' | 'development';

const defaultOptions: Partial<TypeOrmModuleOptions> = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  logging: process.env.DB_LOGGING === 'true',
  synchronize: false, // set to false in all envs, because we want to use migrations
  dropSchema: false, // set to false in all envs, because we want to use migrations
  autoLoadEntities: true,
  entities: [User, Category, Organization, UserOrganization, Transaction, Asset, PocChat, Message],
  migrations: [Init1683855028140, addsearchtitleindex1683855184000],
  ssl: false,
};

const appConfigs = (environment: AppEnvironment): TypeOrmModuleOptions => {
  switch (environment) {
    case 'staging':
      return {
        ...defaultOptions,
        ssl: {
          ca: process.env.POSTGRESQL_SSL_CA ?? '',
          cert: process.env.POSTGRESQL_SSL_CERT ?? '',
          key: process.env.POSTGRESQL_SSL_KEY ?? '',
          rejectUnauthorized: false,
        },
      };

    case 'development':
      return {
        ...defaultOptions,
      };
  }
};

const validateOrFailNodeEnv = (environment: string): void => {
  if (!environment) {
    throw new Error('NODE_ENV not set');
  }
  if (!['staging', 'development'].includes(environment)) {
    throw new Error(`NODE_ENV set to invalid environment: ${environment}`);
  }
};

const coerceNodeEnv = (environment: string): AppEnvironment => {
  if (['staging', 'development'].includes(environment)) {
    return environment as AppEnvironment;
  }
  return 'development';
};

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    validateOrFailNodeEnv(process.env.NODE_ENV);
    return appConfigs(coerceNodeEnv(process.env.NODE_ENV));
  }
}
