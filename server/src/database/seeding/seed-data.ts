import { CreateUserDto } from '../../account-manager/dto/create-user.dto';
import { CreateAssetDto } from '../../assets/dto/create-asset.dto';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';
import { CreateMessageDto } from '../../messages/dto/create-message.dto';
import { CreateOrganizationDto } from '../../organizations/dto/create-organization.dto';
import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { AssetType, Condition } from '../../assets/constants';
import { TransactionStatus } from '../../transactions/transaction-status.enum';
import { CreateUserOrganizationDto } from '../../user-org/dto/create-user-org.dto';
import { ApprovalStatus, Role } from '../../user-org/constants';

const assetImg = 'https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png';

export const seedUsers = (): CreateUserDto[] => {
  const users: CreateUserDto[] = [
    {
      firstName: 'user1First',
      last_name: 'user1Last',
      email: 'user1First@example.com',
      password: 'Secret1234%',
      email_notification_opt_out: false,
    },
    {
      firstName: 'user2First',
      last_name: 'user2Last',
      email: 'user2First@example.com',
      password: 'Secret1234%',
      email_notification_opt_out: true,
    },
  ];
  return users;
};

export function seedAssets(): CreateAssetDto[] {
  const assets: CreateAssetDto[] = [
    {
      title: 'paper',
      description: 'one stack of paper',
      type: AssetType.DONATION,
      condition: Condition.LIKE_NEW,
      quantity: 1,
      imgUrls: [assetImg],
    },
    {
      title: 'chairs',
      description: 'two chairs',
      type: AssetType.REQUEST,
      condition: Condition.EXCELLENT,
      quantity: 2,
      imgUrls: [assetImg],
    },
    {
      title: 'three turtle doves',
      description: 'happy christmas harry',
      type: AssetType.REQUEST,
      condition: Condition.GOOD,
      quantity: 3,
      imgUrls: [assetImg],
    },
    {
      title: 'four loko',
      description: 'the definition of terrible in a can',
      type: AssetType.REQUEST,
      condition: Condition.GOOD,
      quantity: 4,
      imgUrls: [assetImg],
    },
    {
      title: 'five guys burgers and fries',
      description: 'yummm',
      type: AssetType.DONATION,
      condition: Condition.EXCELLENT,
      quantity: 5,
      imgUrls: [assetImg],
    },
    {
      title: 'six pack',
      description: 'nice craftiness',
      type: AssetType.DONATION,
      condition: Condition.EXCELLENT,
      quantity: 6,
      imgUrls: [assetImg],
    },
    {
      title: 'seven/eleven',
      description: 'just... never...',
      type: AssetType.DONATION,
      condition: Condition.LIKE_NEW,
      quantity: 7,
      imgUrls: [assetImg],
    },
    {
      title: 'magic eight ball',
      description: 'decidely so',
      type: AssetType.DONATION,
      condition: Condition.EXCELLENT,
      quantity: 8,
      imgUrls: [assetImg],
    },
    {
      title: 'the whole nine yards',
      description: 'sportsball',
      type: AssetType.DONATION,
      condition: Condition.EXCELLENT,
      quantity: 9,
      imgUrls: [assetImg],
    },
    {
      title: 'ten out of ten',
      description: "this isn't even a tangible thing",
      type: AssetType.DONATION,
      condition: Condition.EXCELLENT,
      quantity: 10,
      imgUrls: [assetImg],
    },
    {
      title: 'eleven eleven',
      description: 'make a wish',
      type: AssetType.REQUEST,
      condition: Condition.EXCELLENT,
      quantity: 11,
      imgUrls: [assetImg],
    },
    {
      title: 'a dozen eggs',
      description: 'bfast',
      type: AssetType.REQUEST,
      condition: Condition.NONE,
      quantity: 12,
      imgUrls: [assetImg],
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
      transaction: null,
    },
    {
      text: 'I would like to accept the furniture.',
      transaction: null,
    },
  ];
  return messages;
};

export const seedOrganizations = (): CreateOrganizationDto[] => {
  const organizations: CreateOrganizationDto[] = [
    {
      name: 'Childrens Home Society of Washington',
      doing_business_as: 'Childrens Home Society of Washington',
      nonprofit_classification: 'charitable',
      description: 'Support children from birth through age 12',
      website: 'https://www.childrenshomesociety.org/',
      address: '12360 LAKE CITY WAY NE, Seattle, WA 98125-5447',
      phone: '2066953200',
      city: 'Seattle',
      state: 'WA',
      ein: '12-3456788',
      image_url: 'https://docs.nestjs.com/assets/logo-small.svg',
    },
    {
      name: 'Audobon Washington',
      doing_business_as: 'Audobon Washington',
      nonprofit_classification: 'charitable',
      description: 'Advocate for sustainable conservation management',
      website: 'https://wa.audubon.org/',
      address: '5902 Lake Washington Blvd S. Seattle, WA 98118',
      phone: '2066522444',
      city: 'Seattle',
      state: 'WA',
      ein: '12-3456789',
      image_url: 'https://docs.nestjs.com/assets/logo-small.svg',
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
