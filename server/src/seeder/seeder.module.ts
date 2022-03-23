import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { SeederService } from './seeder.service';
import { SeedDatabaseConnectionService } from './seed-database-connection.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: SeedDatabaseConnectionService,
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
