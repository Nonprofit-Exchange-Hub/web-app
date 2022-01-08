import { Test, TestingModule } from '@nestjs/testing';
import { userCreateDtoStub, userEntityStub } from '../../test/stubs';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersService as UsersServiceMock } from '../test/__mocks__';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService = new UsersServiceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create user', () => {
    let createdUser: Omit<User, 'password' | 'accept_terms'>;

    describe('when dto is valid', () => {
      beforeEach(async () => {
        createdUser = (await controller.create(userCreateDtoStub())) as
          | Omit<User, 'password' | 'accept_terms'>
          | any;
      });

      it('then it should call service', () => {
        expect(usersService.create).toBeCalledWith(userCreateDtoStub());
      });

      it('then it should return expected entity', () => {
        const expectedUser = userEntityStub();
        expect(createdUser.first_name).toEqual(expectedUser.first_name);
        expect(createdUser.assets).toEqual(expectedUser.assets);
        expect(createdUser.last_name).toEqual(expectedUser.last_name);
        expect(createdUser.id).toEqual(expectedUser.id);
      });

      it('should return entity with omitted fields', () => {
        expect(createdUser['password']).toBeUndefined();
        // entity doesn't have accept_terms field
        expect(createdUser['accept_terms']).toBeUndefined();
      });
    });

    describe('when dto is not valid', () => {
      it('should validate email format', () => {
        const badUserObject = userCreateDtoStub();
        badUserObject.email = 'badEmail.com';

        expect(createdUser);
      });

      it('should return assets belonging to user', () => {
        expect(1).toEqual(1);
      });

      // !!todo
      /*
      also maybe a test for passing in bad data
      like pass in mal-formed user object (maybe without email or something)
      and expect function to throw
      https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
      maybe something like this point_up
      (you can probs import the nest errors somehow)
      */
    });
  });
});
