import { Injectable, Logger } from '@nestjs/common';
import { seedUserOrganization, seedUsers } from '../database/seeding/seed-data';
import { seedAssets } from '../database/seeding/seed-data';
import { seedCategories } from '../database/seeding/seed-data';
import { seedMessages } from '../database/seeding/seed-data';
import { seedOrganizations } from '../database/seeding/seed-data';
import { seedTransactions } from '../database/seeding/seed-data';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { User } from '../users/entities/user.entity';
import { Asset } from '../assets/entities/asset.entity';
import { Message } from '../messages/entities/message.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { UserOrganization } from 'src/user-org/entities/user-org.entity';
import { UsersService } from '../users/users.service';
import { AssetsService } from '../assets/assets.service';
import { CategoriesService } from '../categories/categories.service';
import { MessagesService } from '../messages/messages.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { TransactionsService } from '../transactions/transactions.service';
import { UserOrganizationsService } from '../user-org/user-org.service';
import { Connection, EntityMetadata, Repository } from 'typeorm';
import { AssetType, Condition } from 'src/assets/constants';
import { TransactionStatus } from 'src/transactions/transaction-status.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAssetDto } from 'src/assets/dto/create-asset.dto';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { ApprovalStatus, Role } from 'src/user-org/constants';

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UsersService,
    private readonly assetService: AssetsService,
    private readonly categoryService: CategoriesService,
    private readonly organizationService: OrganizationsService,
    private readonly messageService: MessagesService,
    private readonly transactionService: TransactionsService,
    private readonly userorgService: UserOrganizationsService,
    private readonly connx: Connection,
  ) {}

  /**
   * Seeds demo users if they don't exist
   */

  public async seedUsersAsync(): Promise<void> {
    Logger.log('starting to seed users', SeederService.name);

    const users = seedUsers();
    for (const user of users) {
      Logger.log('starting to seed a user', SeederService.name);
      const exists = await this.userService.userEmailExists(user.email);
      if (!exists) {
        Logger.log('Seeding Users', SeederService.name);
        await this.userService.create(user).catch((err) => Logger.log(err));
      }
    }
  }

  public async seedAssetsAsync(): Promise<void> {
    const user3: CreateUserDto = {
      firstName: 'user3First',
      last_name: 'user3Last',
      email: 'user3First@example.com',
      password: 'Secret1234%',
    };

    Logger.log('adding the extra user', SeederService.name);
    const rawInsertedUser: void | Omit<User, 'password'> = await this.userService
      .create(user3)
      .catch((err) => Logger.log(err));

    let insertedUser;

    if (rawInsertedUser) {
      insertedUser = rawInsertedUser;
    } else {
      throw Error('newly created user is void.');
    }

    Logger.log('starting to seed the assets', SeederService.name);
    const assets: CreateAssetDto[] = seedAssets();

    for (const asset of assets) {
      Logger.log('Seeding an Asset', SeederService.name);
      asset.poster = insertedUser;
      await this.assetService.create(asset).catch((err) => Logger.log(err));
    }
    Logger.log('at end of seeding the assets', SeederService.name);
  }

  public async seedCategoriesAsync(): Promise<void> {
    seedCategories().forEach(async (category: CreateCategoryDto) => {
      Logger.log('Seeding Categories', SeederService.name);
      this.categoryService.create(category).catch((err) => Logger.log(err));
    });
  }

  public async seedOrganizationsAsync(): Promise<void> {
    const organizations = seedOrganizations();
    Logger.log('Seeding Organizations', SeederService.name);
    for (const organization of organizations) {
      Logger.log('Seeding Organization', SeederService.name);
      await this.organizationService.create(organization).catch((err) => Logger.log(err));
    }
  }

  public async seedMessagesAsync(): Promise<void> {
    const user4: User = {
      id: 4,
      firstName: 'user4First',
      last_name: 'user4Last',
      email: 'user4First@example.com',
      password: 'Secret1234%',
      assets: null,
      transactions: null,
      organizations: null,
      messages: null,
    };

    const organization3: Organization = {
      id: 3,
      name: 'ASPCA',
      description: 'Animal Organization',
      website:
        'https://wwww.aspca.org/nyc/aspca-adoption-center/adoptable-cats/washington-a31041954',
      address:
        'American Society for the Prevention of Cruelty to Animals (ASPCA),424 E. 92nd St, New York, NY 10128-6804',
      phone: '8886662279',
      city: 'New York',
      state: 'MA',
      ein: 131623834,
      tax_exempt_id: 0,
      users: [],
      transactions: [],
    };

    const userOrganization3: UserOrganization = {
      id: 3,
      approvalStatus: ApprovalStatus.approved,
      organization: organization3,
      role: Role.owner,
      user: user4,
      created_date: undefined,
    };

    const asset3: Asset = {
      id: 3,
      title: 'paper clips',
      description: 'box',
      poster: user4,
      quantity: 1,
      condition: Condition.EXCELLENT,
      type: AssetType.REQUEST,
      imgUrls: ['0'],
      transactions: [],
    };

    const transaction: CreateTransactionDto = {
      donater_user: user4,
      status: TransactionStatus.IN_PROGRESS,
      asset: asset3,
      donater_organization: organization3,
      recipient: organization3,
    };

    Logger.log('starting to seed the messages', SeederService.name);
    Logger.log('adding the extra user, asset, and transaction', SeederService.name);

    const rawInsertedUser4: void | Omit<User, 'password'> = await this.userService
      .create(user4)
      .catch((err) => Logger.log(err));
    const rawInsertedAsset3: void | Asset = await this.assetService
      .create(asset3)
      .catch((err) => Logger.log(err));
    const rawInsertedOrg2: void | Organization = await this.organizationService
      .create(organization3)
      .catch((err) => Logger.log(err));
    const rawInsertUserOrg3: void | UserOrganization = await this.userorgService
      .create(userOrganization3)
      .catch((err) => Logger.log(err));
    const rawInsertedTransaction: void | Transaction = await this.transactionService
      .createTransaction(transaction)
      .catch((err) => Logger.log(err));

    const messages: CreateMessageDto[] = seedMessages();

    let insertedUser4;

    if (rawInsertedUser4) {
      insertedUser4 = rawInsertedUser4;
    } else {
      throw Error('newly created user is void.');
    }

    let insertUserOrg3;

    if (rawInsertUserOrg3) {
      insertUserOrg3 = rawInsertUserOrg3;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedAsset3;

    if (rawInsertedAsset3) {
      insertedAsset3 = rawInsertedAsset3;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedOrg2;

    if (rawInsertedOrg2) {
      insertedOrg2 = rawInsertedOrg2;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedTransaction;

    if (rawInsertedTransaction) {
      insertedTransaction = rawInsertedTransaction;
    } else {
      throw Error('newly created user is void.');
    }

    Logger.log('Seeding a message', SeederService.name);
    for (const message of messages) {
      message.user = insertedUser4;
      message.transaction = insertedTransaction;
      await this.messageService.create(message).catch((err) => Logger.log(err));
    }
    Logger.log('at end of seeding the messages', SeederService.name);
  }

  public async seedTransactionsAsync(): Promise<void> {
    Logger.log('starting to seed the transactions', SeederService.name);
    const user5: User = {
      id: 5,
      firstName: 'user5First',
      last_name: 'user5Last',
      email: 'user5First@example.com',
      password: 'Secret1234%',
      assets: [],
      transactions: [],
      messages: [],
      organizations: [],
    };

    const user6: User = {
      id: 6,
      firstName: 'user6First',
      last_name: 'user6Last',
      email: 'user6First@example.com',
      password: 'Secret1234%',
      assets: [],
      transactions: [],
      messages: [],
      organizations: [],
    };

    const asset4: Asset = {
      id: 4,
      title: 'diapers',
      description: 'case of diapers',
      poster: user6,
      quantity: 1,
      condition: Condition.EXCELLENT,
      type: AssetType.REQUEST,
      imgUrls: ['0'],
      transactions: [],
    };

    const organization4: Organization = {
      id: 4,
      name: 'Bill and Melinda Gates Foundation',
      description: 'philanthropy',
      website: 'https://www.gatesfoundation.org/',
      address: '500 Fifth Avenue North, Seattle, WA United States 98109',
      phone: '2067093100',
      city: 'Seattle',
      state: 'WA',
      ein: 562618866,
      tax_exempt_id: 0,
      users: [],
      transactions: [],
    };

    const transaction1: Transaction = {
      id: 4,
      donater_user: user6,
      donater_organization: organization4,
      recipient: organization4,
      messages: null,
      asset: asset4,
      status: TransactionStatus.COMPLETED,
      created_date: undefined,
    };

    const message3: CreateMessageDto = {
      text: 'I will take the total amount.',
      user: user6,
      transaction: transaction1,
    };

    const organization5: Organization = {
      id: 5,
      name: 'Seattle Foundation',
      description: 'philanthropy',
      website: 'https://www.seattlefoundation.org/',
      address: '1601 Fifth Avenue, Suite 1900, Seattle, WA 98101-3615',
      phone: '2066222294',
      city: 'Seattle',
      state: 'WA',
      ein: 916013536,
      tax_exempt_id: 0,
      users: [],
      transactions: [transaction1],
    };

    Logger.log(
      'starting to add additional users, assets, organization, and message',
      SeederService.name,
    );

    const rawInsertedUser5: void | Omit<User, 'password'> = await this.userService
      .create(user5)
      .catch((err) => Logger.log(err));
    const rawInsertedUser6: void | Omit<User, 'password'> = await this.userService
      .create(user6)
      .catch((err) => Logger.log(err));
    const rawInsertedAsset4: void | Asset = await this.assetService
      .create(asset4)
      .catch((err) => Logger.log(err));
    const rawInsertedOrganization4: void | Organization = await this.organizationService
      .create(organization4)
      .catch((err) => Logger.log(err));
    const rawInsertedOrganization5: void | Organization = await this.organizationService
      .create(organization5)
      .catch((err) => Logger.log(err));
    transaction1.donater_organization = organization4;
    const rawInsertTransaction1: void | Transaction = await this.transactionService
      .createTransaction(transaction1)
      .catch((err) => Logger.log(err));
    const rawInsertedMessage3: void | Message = await this.messageService
      .create(message3)
      .catch((err) => Logger.log(err));

    let insertedUser5;

    if (rawInsertedUser5) {
      insertedUser5 = rawInsertedUser5;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedUser6;

    if (rawInsertedUser6) {
      insertedUser6 = rawInsertedUser6;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedAsset4;

    if (rawInsertedAsset4) {
      insertedAsset4 = rawInsertedAsset4;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedOrganization4;

    if (rawInsertedOrganization4) {
      insertedOrganization4 = rawInsertedOrganization4;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedOrganization5;

    if (rawInsertedOrganization5) {
      insertedOrganization5 = rawInsertedOrganization5;
    } else {
      throw Error('newly created user is void.');
    }

    let insertedMessage3;

    if (rawInsertedMessage3) {
      insertedMessage3 = rawInsertedMessage3;
    } else {
      throw Error('newly created user is void.');
    }

    const transactions: CreateTransactionDto[] = seedTransactions();

    for (const transaction of transactions) {
      Logger.log('seeding a transaction', SeederService.name);
      transaction.donater_organization = insertedOrganization5;
      transaction.donater_user = insertedUser6;
      transaction.recipient = insertedOrganization4;
      transaction.asset = insertedAsset4;
      await this.transactionService.createTransaction(transaction).catch((err) => Logger.log(err));
    }
    Logger.log('at end of seeding the transactions', SeederService.name);
  }

  public async seedUserOrgAsync(): Promise<void> {
    const user7: User = {
      id: 7,
      firstName: 'user7First',
      last_name: 'user7Last',
      email: 'user7First@example.com',
      password: 'Secret1234%',
      assets: null,
      transactions: null,
      messages: null,
      organizations: null,
    };

    const organization6: Organization = {
      id: 6,
      name: 'Seattle Opera',
      description: 'music foundation',
      website: 'https://www.seattleopera.org/',
      address: '363 Mercer Street, Seattle, WA 98109',
      phone: '2063897669',
      city: 'Seattle',
      state: 'WA',
      ein: 910760426,
      tax_exempt_id: 0,
      users: null,
      transactions: null,
    };
    Logger.log('Seeding Additional User and Organization', SeederService.name);
    await this.userService.create(user7).catch((err) => Logger.log(err));
    await this.organizationService.create(organization6).catch((err) => Logger.log(err));
    const userOrgs = seedUserOrganization(organization6, user7);
    Logger.log('Seeding UserOrganizations', SeederService.name);
    for (const userOrg of userOrgs) {
      Logger.log('Seeding UserOrg', SeederService.name);
      await this.userorgService.create(userOrg).catch((err) => Logger.log(err));
    }
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
