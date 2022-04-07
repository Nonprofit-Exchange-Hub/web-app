import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { SeederService } from './seeder.service';
import { DatabaseConnectionService } from '../database-connection.service';

import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env' });

const dbOptions = new DatabaseConnectionService().createTypeOrmOptions();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbOptions,
      autoLoadEntities: false,
      entities: ['./src/**/*.entity.ts'],
      keepConnectionAlive: true,
    }),
    UsersModule,
  ],
  providers: [Logger, SeederService],
})
export class SeederModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  /**
   * implements a NESTJS lifecycle method
   */
  async onApplicationBootstrap() {
    Logger.log('onApplicationBootstrap', SeederModule.name);

    // remove all data
    this.seederService.truncateFromAllTables();

    // seed the users table
    await this.seederService.seedUsersAsync();
  }
}
