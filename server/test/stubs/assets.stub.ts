import { AssetType, Condition } from '../../src/assets/constants';
import { Asset } from '../../src/assets/entities/asset.entity';

export const assetsStub = (): Asset => {
  return {
    id: 2435,
    title: 'fakeTitle',
    description: 'fakeDescription',
    type: AssetType.DONATION,
    condition: Condition.EXCELLENT,
    quantity: 6,
    poster: {
      id: 234545,
      first_name: 'fakeUser',
      last_name: 'John',
      email: 'user@test.com',
      password: 'Secret1234$',
      assets: null,
      messages: null,
    },
  };
};
