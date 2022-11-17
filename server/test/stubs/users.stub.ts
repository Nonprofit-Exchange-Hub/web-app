import { Message } from '../../src/messages/entities/message.entity';
import { Asset } from '../../src/assets/entities/asset.entity';
import { CreateUserDto } from '../../src/account-manager/dto/create-user.dto';
import { User } from '../../src/account-manager/entities/user.entity';
import { Transaction } from '../../src/transactions/entities/transaction.entity';
import { UserOrganization } from '../../src/user-org/entities/user-org.entity';

export const userEntityStub = (
  assets?: Asset[],
  messages?: Message[],
  transactions?: Transaction[],
  organizations?: UserOrganization[],
): User => {
  return {
    id: 234545,
    firstName: 'fakeUser',
    last_name: 'John',
    email: 'Doe',
    password: 'Secret1234$',
    assets: assets,
    messages,
    transactions,
    organizations,
  };
};

export const userCreateDtoStub = (): CreateUserDto => {
  return {
    firstName: 'jakeUser',
    last_name: 'fakeLast',
    email: 'fakeUser@test.com',
    password: 'Secret1234$',
  };
};
