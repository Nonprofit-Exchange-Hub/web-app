import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { User } from '../../src/users/entities/user.entity';
import { assetsStub } from './assets.stub';
import { messageStub } from './messages.stub';

export const userEntityStub = (): User => {
  return {
    id: 234545,
    first_name: 'fakeUser',
    last_name: 'John',
    email: 'Doe',
    password: 'Secret1234$',
    assets: [assetsStub()],
    messages: [messageStub()],
  };
};

export const userCreateDtoStub = (): CreateUserDto => {
  return {
    first_name: 'jakeUser',
    last_name: 'fakeLast',
    email: 'fakeUser@test.com',
    password: 'Secret1234$',
  };
};
