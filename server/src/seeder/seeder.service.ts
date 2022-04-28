import { Injectable, Logger } from '@nestjs/common';
import { seedUsers } from '../database/seeding/seed-data';
import { seedAssets } from '../database/seeding/seed-data';
import { seedCategories } from '../database/seeding/seed-data';
import { seedMessages } from '../database/seeding/seed-data';
import { seedOrganizations } from '../database/seeding/seed-data';
import { seedTransactions } from '../database/seeding/seed-data';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateAssetDto } from '../assets/dto/create-asset.dto';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { CreateOrganizationDto } from '../organizations/dto/create-organization.dto';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { AssetsService } from '../assets/assets.service';
import { CategoriesService } from '../categories/categories.service';
import { MessagesService } from '../messages/messages.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { TransactionsService } from '../transactions/transactions.service';
import { Connection, EntityMetadata, Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UsersService,
    private readonly assetService: AssetsService,
    private readonly categoryService: CategoriesService,
    private readonly organizationService: OrganizationsService,
    private readonly messageService: MessagesService,
    private readonly transactionService: TransactionsService,
    private readonly connx: Connection,
  ) {}

  /**
   * Seeds demo users if they don't exist
   */
  public async seedUsersAsync(): Promise<void> {
    seedUsers().forEach(async (user: CreateUserDto) => {
      const exists = await this.userService.userEmailExists(user.email);
      if (!exists) {
        Logger.log('Seeding Users', SeederService.name);
        this.userService.create(user).catch((err) => Logger.log(err));
      }
    });
  }

  public async seedAssetsAsync(): Promise<void> {
    seedAssets().forEach(async (asset: CreateAssetDto) => {
      Logger.log('Seeding Assets', SeederService.name);
      this.assetService.create(asset).catch((err) => Logger.log(err));
    });
  }

  public async seedCategoriesAsync(): Promise<void> {
    seedCategories().forEach(async (category: CreateCategoryDto) => {
      Logger.log('Seeding Categories', SeederService.name);
      this.categoryService.create(category).catch((err) => Logger.log(err));
    });
  }

  public async seedOrganizationsAsync(): Promise<void> {
    seedOrganizations().forEach(async (organization: CreateOrganizationDto) => {
      Logger.log('Seeding Organizations', SeederService.name);
      this.organizationService.create(organization).catch((err) => Logger.log(err));
    });
  }

  public async seedMessagesAsync(): Promise<void> {
    seedMessages().forEach(async (message: CreateMessageDto) => {
      Logger.log('Seeding Messages', SeederService.name);
      this.messageService.create(message).catch((err) => Logger.log(err));
    });
  }

  public async seedTransactionsAsync(): Promise<void> {
    seedTransactions().forEach(async (transaction: CreateTransactionDto) => {
      Logger.log('Seeding Transactions', SeederService.name);
      this.transactionService.createTransaction(transaction).catch((err) => Logger.log(err));
    });
  }

  /**
   * removes all data in DB in a cascading style
   */
  public truncateFromAllTables(): void {
    Logger.log('Truncating all tables in cascade', SeederService.name);
    const entities: EntityMetadata[] = this.connx.entityMetadatas;
    for (const entity of entities) {
      const repository: Repository<unknown> = this.connx.getRepository(entity.name);
      repository.query(`TRUNCATE ${entity.tableName} CASCADE;`);
    }
  }
}
