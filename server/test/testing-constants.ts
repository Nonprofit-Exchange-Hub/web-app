/**
 * a simple file for mostly holding testing constants
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TEST_DB_OPTIONS: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_password',
  database: 'e2e',
  synchronize: true, //shouldn't be used in production
  dropSchema: false, //toggle to true to clear database schema
  logging: false,

  entities: ['./src/**/*.entity.ts'],
};
