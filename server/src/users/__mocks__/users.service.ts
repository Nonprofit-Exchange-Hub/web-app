import { userEntityStub } from '../../../test/stubs';

// https://medium.com/@deanslamajr/jest-fn-all-the-things-d26f3b929986
export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(userEntityStub()),
});
