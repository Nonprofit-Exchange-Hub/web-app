import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePocChatDto } from './dto/create-poc-chat.dto';
import { PocChat } from './entities/poc-chat.entity';

@Injectable()
export class PocChatService {
  clientToUser = {};

  constructor(@InjectRepository(PocChat) private pocChat: Repository<PocChat>) {}
  async create(createPocChatDto: CreatePocChatDto) {
    await this.pocChat.save(
      new PocChat({ text: createPocChatDto.text, name: createPocChatDto.name }),
    );
    const messages = this.pocChat.find();
    return messages;
  }

  findAll() {
    return this.pocChat.find();
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
