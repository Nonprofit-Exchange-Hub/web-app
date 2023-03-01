import { Test, TestingModule } from '@nestjs/testing';
import { AccountManagerService } from './account-manager.service';

describe('AccountManagerService', () => {
  let service: AccountManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //TODO I put a empty mock for UserService. For real testing we'll need
      // to create a mock since we are using TypeORM
      providers: [{ provide: AccountManagerService, useValue: {} }],
    }).compile();

    service = module.get<AccountManagerService>(AccountManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
