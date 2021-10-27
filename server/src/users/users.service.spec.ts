import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';



describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //TODO I put a empty mock for UserService. For real testing we'll need
      // to create a mock since we are using TypeORM
      providers: [{provide:UsersService, useValue:{}}],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
