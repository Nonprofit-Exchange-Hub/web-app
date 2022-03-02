import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConnectionService } from 'src/database-connection.service';
import { UsersModule } from 'src/users/users.module';
import { SeederService } from './seeder.service';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

const typeOrmConnectionOpts = new DatabaseConnectionService().createTypeOrmOptions();
const defaultConnectionOptions: TypeOrmModuleOptions = { ...typeOrmConnectionOpts };
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      ...defaultConnectionOptions,
      autoLoadEntities: false,
      entities: ['./src/**/*.entity.ts'],
    }),
    UsersModule,
  ],
  providers: [Logger, SeederService, DatabaseConnectionService],
})
export class SeederModule {}
