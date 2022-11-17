import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from '../assets/assets.module';
import { CategoriesModule } from '../categories/categories.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { MessagesModule } from '../messages/messages.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { UserOrganizationsModule } from '../user-org/user-org.module';

import { SeederService } from './seeder.service';
import { DatabaseConnectionService } from '../database-connection.service';

import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AccountManagerModule } from '../account-manager/account-manager.module';

dotenv.config({ path: __dirname + '/../../.env' });

const dbOptions = new DatabaseConnectionService().createTypeOrmOptions();
const seederDbOptions: PostgresConnectionOptions = {
  ...dbOptions,
  entities: ['./src/**/*.entity.ts'],
} as PostgresConnectionOptions;

@Module({
  imports: [
    TypeOrmModule.forRoot(seederDbOptions),
    AccountManagerModule,
    AssetsModule,
    CategoriesModule,
    OrganizationsModule,
    MessagesModule,
    TransactionsModule,
    UserOrganizationsModule,
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
    await this.seederService.truncateFromAllTables();

    // seed the users table
    await this.seederService
      .seedUsersAsync()
      .then((newUsers) => this.seederService.seedAssetsAsync(newUsers))
      .then((seedAssetsResult) => this.seederService.seedCategoriesAsync(seedAssetsResult))
      .then((seedCategoriesResult) =>
        this.seederService.seedOrganizationsAsync(seedCategoriesResult),
      )
      .then((seedOrganizationsResult) =>
        this.seederService.seedMessagesAsync(seedOrganizationsResult),
      )
      .then((seedMessagesResult) => this.seederService.seedTransactionsAsync(seedMessagesResult))
      .then((seedTransactionsResult) =>
        this.seederService.seedUserOrgAsync(seedTransactionsResult),
      );
  }
}
