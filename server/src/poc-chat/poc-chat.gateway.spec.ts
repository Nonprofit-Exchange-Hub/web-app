import { Test, TestingModule } from '@nestjs/testing';
import { PocChatGateway } from './poc-chat.gateway';
import { PocChatService } from './poc-chat.service';

describe('PocChatGateway', () => {
  let gateway: PocChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PocChatGateway, PocChatService],
    }).compile();

    gateway = module.get<PocChatGateway>(PocChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
