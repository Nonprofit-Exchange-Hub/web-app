import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateAssetDto } from '../../assets/dto/create-asset.dto';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';
import { CreateMessageDto } from '../../messages/dto/create-message.dto';
import { CreateOrganizationDto } from '../../organizations/dto/create-organization.dto';
import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { AssetType, Condition } from '../../assets/constants';
import { TransactionStatus } from '../../transactions/transaction-status.enum';
import { CreateUserOrganizationDto } from 'src/user-org/dto/create-user-org.dto';
import { ApprovalStatus, Role } from 'src/user-org/constants';

export const seedUsers = (): CreateUserDto[] => {
  const users: CreateUserDto[] = [
    {
      firstName: 'user1First',
      last_name: 'user1Last',
      email: 'user1First@example.com',
      password: 'Secret1234%',
    },
    {
      firstName: 'user2First',
      last_name: 'user2Last',
      email: 'user2First@example.com',
      password: 'Secret1234%',
    },
  ];
  return users;
};

export function seedAssets(): CreateAssetDto[] {
  const assets: CreateAssetDto[] = [
    {
      title: 'paper',
      description: 'stack of paper',
      type: AssetType.DONATION,
      poster: null,
      condition: Condition.LIKE_NEW,
      quantity: 1,
    },
    {
      title: 'chairs',
      description: 'two chairs',
      type: AssetType.REQUEST,
      poster: null,
      condition: Condition.EXCELLENT,
      quantity: 2,
    },
  ];
  return assets;
}

export function seedTransactionsAsset(): CreateAssetDto[] {
  const transactionsAsset: CreateAssetDto[] = [
    {
      title: 'diapers',
      description: 'infant diapers',
      type: AssetType.DONATION,
      condition: Condition.LIKE_NEW,
      quantity: 0,
      poster: null,
    },
  ];
  return transactionsAsset;
}

export const seedCategories = (): CreateCategoryDto[] => {
  const categories: CreateCategoryDto[] = [
    {
      name: 'paper products',
      applies_to_assets: true,
      applies_to_organizations: false,
    },
    {
      name: 'furniture',
      applies_to_assets: true,
      applies_to_organizations: true,
    },
  ];
  return categories;
};

export const seedMessages = (): CreateMessageDto[] => {
  const messages: CreateMessageDto[] = [
    {
      text: 'I would like to accept the paper products.',
      user: null,
      transaction: null,
    },
    {
      text: 'I would like to accept the furniture.',
      user: null,
      transaction: null,
    },
  ];
  return messages;
};

export const seedOrganizations = (): CreateOrganizationDto[] => {
  const organizations: CreateOrganizationDto[] = [
    {
      name: 'Childrens Home Society of Washington',
      description: 'Support children from birth through age 12',
      website: 'https://www.childrenshomesociety.org/',
      address: '12360 LAKE CITY WAY NE, Seattle, WA 98125-5447',
      phone: '2066953200',
      city: 'Seattle',
      state: 'WA',
      ein: '12-3456788',
    },
    {
      name: 'Audobon Washington',
      description: 'Advocate for sustainable conservation management',
      website: 'https://wa.audubon.org/',
      address: '5902 Lake Washington Blvd S. Seattle, WA 98118',
      phone: '2066522444',
      city: 'Seattle',
      state: 'WA',
      ein: '12-3456789',
    },
  ];
  return organizations;
};

export const seedTransactions = (): CreateTransactionDto[] => {
  const transactions: CreateTransactionDto[] = [
    {
      donater_user: null,
      donater_organization: null,
      recipient: null,
      message: null,
      asset: null,
      status: TransactionStatus.COMPLETED,
    },
    {
      donater_user: null,
      donater_organization: null,
      recipient: null,
      message: null,
      asset: null,
      status: TransactionStatus.IN_PROGRESS,
    },
  ];
  return transactions;
};

export const seedUserOrganization = (): CreateUserOrganizationDto[] => {
  const userOrganizations: CreateUserOrganizationDto[] = [
    {
      approvalStatus: ApprovalStatus.approved,
      organization: null,
      role: Role.owner,
      user: null,
    },
  ];

  return userOrganizations;
};
