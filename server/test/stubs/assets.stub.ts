import { AssetType, Condition } from '../../src/assets/constants';
import { Asset } from '../../src/assets/entities/asset.entity';
import { User } from '../../src/users/entities/user.entity';

export const assetsStub = (): Asset => {
  return {
    id: 2435,
    title: 'fakeTitle',
    description: 'fakeDescription',
    type: AssetType.DONATION,
    condition: Condition.EXCELLENT,
    quantity: 6,
    poster: new User(),
  };
};
