/**
 * a simple file for mostly holding testing constants
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

export const TEST_DB_OPTIONS: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.E2E_DATABASE_DB,
  synchronize: true, //shouldn't be used in production
  dropSchema: false, //toggle to true to clear database schema
  logging: false,

  entities: ['./src/**/*.entity.ts'],
};
