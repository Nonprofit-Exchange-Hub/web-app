/**
 * a simple file for mostly holding testing constants
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/e2e.env' });

export const TEST_DB_OPTIONS: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.E2E_DATABASE_HOST,
  port: Number(process.env.E2E_DATABASE_PORT),
  username: process.env.E2E_DATABASE_USER,
  password: process.env.E2E_DATABASE_PASSWORD,
  database: process.env.E2E_DATABASE_DB,
  synchronize: true, //shouldn't be used in production
  dropSchema: false, //toggle to true to clear database schema
  logging: false,

  entities: ['./src/**/*.entity.ts'],
};
