import { Test, TestingModule } from '@nestjs/testing';
import { PocChatService } from './poc-chat.service';

describe('PocChatService', () => {
  let service: PocChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PocChatService],
    }).compile();

    service = module.get<PocChatService>(PocChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
