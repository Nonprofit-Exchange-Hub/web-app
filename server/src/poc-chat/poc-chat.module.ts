import { Module } from '@nestjs/common';
import { PocChatService } from './poc-chat.service';
import { PocChatGateway } from './poc-chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocChat } from './entities/poc-chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PocChat])],
  providers: [PocChatGateway, PocChatService],
})
export class PocChatModule {}
