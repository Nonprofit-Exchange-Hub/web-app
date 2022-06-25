import { Module } from '@nestjs/common';
import { PocChatService } from './poc-chat.service';
import { PocChatGateway } from './poc-chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocChat } from './entities/poc-chat.entity';
import { WsCookieGuardGuard } from 'src/auth/guards/ws-cookie-guard.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PocChat]), AuthModule],
  providers: [PocChatGateway, PocChatService, WsCookieGuardGuard],
})
export class PocChatModule {}
