import { User } from '../../src/users/entities/user.entity';
import { AssetType, Condition } from '../../src/assets/constants';
import { Asset } from '../../src/assets/entities/asset.entity';
import { Transaction } from '../../src/transactions/entities/transaction.entity';

export const assetsStub = (poster: User, transactions: Transaction[]): Asset => {
  return {
    id: 2435,
    title: 'fakeTitle',
    description: 'fakeDescription',
    type: AssetType.DONATION,
    condition: Condition.EXCELLENT,
    quantity: 6,
    poster,
    transactions,
  };
};
