import { Module } from '@nestjs/common';
import { PocChatService } from './poc-chat.service';
import { PocChatGateway } from './poc-chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocChat } from './entities/poc-chat.entity';
import { AcccountManagerModule } from '../acccount-manager/acccount-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([PocChat]), AcccountManagerModule],
  providers: [PocChatGateway, PocChatService, AcccountManagerModule],
})
export class PocChatModule {}
