import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addsearchabletoassets1679101636074 } from 'sql-scripts/migrations/1679101636074-add_searchable_to_assets';
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
      synchronize: true, //shouldn't be used in production
      dropSchema: false, //toggle to true to clear database schema
      logging: true,
      autoLoadEntities: true,
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
