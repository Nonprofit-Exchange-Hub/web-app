import { Test, TestingModule } from '@nestjs/testing';
import { userCreateDtoStub } from '../../test/stubs';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      //TODO I put a empty mock for UserService. For real testing we'll need
      // to create a mock since we are using TypeORM
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create user', () => {
    let createdUser: any;

    describe('when dto is valid', () => {
      beforeEach(async () => {
        createdUser = await controller.create(userCreateDtoStub());
      });

      it('then it should call service', () => {
        expect(usersService.create).toBeCalledWith(userCreateDtoStub());
      });

      it('should return entity with omitted fields', () => {
        expect(createdUser.password).toBeUndefined();
        // entity doesn't have accept_terms field
        expect(createdUser.accept_terms).toBeUndefined();
      });
    });
  });
});
