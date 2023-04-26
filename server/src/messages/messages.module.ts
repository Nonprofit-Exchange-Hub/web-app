import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './entities/message.entity';
import { AcccountManagerModule } from '../acccount-manager/acccount-manager.module';
import { Receivedmessage } from 'src/received-messages/entities/received-messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Receivedmessage]), AcccountManagerModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
