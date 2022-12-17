import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SendgridModule } from '../sendgrid/sendgrid.module';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      // TODO I put a empty mock for UserService. For real testing we'll need
      // to create a mock since we are using TypeORM
      providers: [{ provide: UsersService, useValue: {} }],
      imports: [
        SendgridModule,
        JwtModule.register({
          secret: 'SG.',
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
