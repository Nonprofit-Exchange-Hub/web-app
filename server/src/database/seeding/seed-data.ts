import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateAssetDto } from '../../assets/dto/create-asset.dto';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';
import { CreateMessageDto } from '../../messages/dto/create-message.dto';
import { CreateOrganizationDto } from '../../organizations/dto/create-organization.dto';
import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { AssetType, Condition } from '../../assets/constants';
import { TransactionStatus } from '../../transactions/transaction-status.enum';

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

export const seedAssets = (): CreateAssetDto[] => {
  const assets: CreateAssetDto[] = [
    {
      title: 'paper',
      description: 'stack of paper',
      poster: { id: 1 },
      type: AssetType.DONATION,
      condition: Condition.LIKE_NEW,
    },
    {
      title: 'chairs',
      description: 'two chairs',
      poster: { id: 2 },
      type: AssetType.REQUEST,
      condition: Condition.EXCELLENT,
    },
  ];
  return assets;
};

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
      user: { id: 1 },
      transaction: { id: 1 },
    },
    {
      text: 'I would like to accept the furniture.',
      user: { id: 2 },
      transaction: { id: 2 },
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
      ein: 910575955,
      tax_exempt_id: 432032452,
    },
    {
      name: 'Audobon Washington',
      description: 'Advocate for sustainable conservation management',
      website: 'https://wa.audubon.org/',
      address: '5902 Lake Washington Blvd S. Seattle, WA 98118',
      phone: '2066522444',
      city: 'Seattle',
      state: 'WA',
      ein: 916009716,
      tax_exempt_id: 916009716,
    },
  ];
  return organizations;
};

export const seedTransactions = (): CreateTransactionDto[] => {
  const transactions: CreateTransactionDto[] = [
    {
      donater_user: { id: 1 },
      donater_organization: { id: 1 },
      recipient: { id: 1 },
      asset: { id: 1 },
      status: TransactionStatus.COMPLETED,
    },
    {
      donater_user: { id: 2 },
      donater_organization: { id: 2 },
      recipient: { id: 2 },
      asset: { id: 2 },
      status: TransactionStatus.IN_PROGRESS,
    },
  ];
  return transactions;
};
