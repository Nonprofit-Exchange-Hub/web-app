import { Module } from '@nestjs/common';
import { PocChatService } from './poc-chat.service';
import { PocChatGateway } from './poc-chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocChat } from './entities/poc-chat.entity';
import { WsCookieGuardGuard } from '../account-manager/guards/ws-cookie-guard.guard';
import { AccountManagerModule } from '../account-manager/account-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([PocChat]), AccountManagerModule],
  providers: [PocChatGateway, PocChatService, WsCookieGuardGuard],
})
export class PocChatModule {}
