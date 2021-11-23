import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesRepository.save(createMessageDto);
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    return this.messagesRepository.findOne(id);
  }

  async findByUser(user: User): Promise<Message[]> {
    const messages = this.messagesRepository.find({ where: { user: user } });
    return messages;
  }

  // when transactions are set up
  // async findByTransaction(transaction: Transaction): Promise<Message[]> {
  //   const messages = this.messagesRepository.find({
  //     where: { transaction: transaction },
  //   });
  //   return messages;
  // }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    await this.messagesRepository.update(id, updateMessageDto);
    return this.messagesRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.messagesRepository.delete(id);
  }
}
