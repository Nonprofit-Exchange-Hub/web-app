import { userEntityStub } from '../../../test/stubs';

// https://jestjs.io/docs/manual-mocks
export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(userEntityStub()),
});
