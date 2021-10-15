import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.messagesRepository.save(createMessageDto);
  }

  findAll() {
    return this.messagesRepository.find();
  }

  findOne(id: number) {
    return this.messagesRepository.findOne(id);
  }

  findByUser(user: User) {
    const messages = this.messagesRepository.find({ where: { user: user } });
    return messages;
  }

  // when transactions are set up
  // findByTransaction(transaction: Transaction) {
  //   const messages = this.messagesRepository.find({
  //     where: { transaction: transaction },
  //   });
  //   return messages;
  // }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.messagesRepository.update(id, updateMessageDto);
    return this.messagesRepository.findOne(id);
  }

  remove(id: number) {
    return this.messagesRepository.delete(id);
  }
}
