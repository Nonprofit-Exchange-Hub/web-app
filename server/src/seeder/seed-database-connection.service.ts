import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env' });

/**
 * specific to the seeding process
 */
@Injectable()
export class SeedDatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true, //shouldn't be used in production
      dropSchema: false, //toggle to true to clear database schema
      logging: true,
      entities: ['./src/**/*.entity.ts'],
      keepConnectionAlive: true,
      connectTimeoutMS: 1000,
    };
  }
}
