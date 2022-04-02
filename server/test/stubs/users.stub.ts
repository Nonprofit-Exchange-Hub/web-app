import { Message } from '../../src/messages/entities/message.entity';
import { Asset } from '../../src/assets/entities/asset.entity';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { User } from '../../src/users/entities/user.entity';
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
    lastName: 'John',
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
    lastName: 'fakeLast',
    email: 'fakeUser@test.com',
    password: 'Secret1234$',
  };
};
