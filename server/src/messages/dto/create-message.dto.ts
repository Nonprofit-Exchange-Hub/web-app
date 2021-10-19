import { PartialType } from '@nestjs/mapped-types';
import { Message } from '../entities/message.entity';

export class CreateMessageDto extends PartialType(Message) {
  text: string;
  transaction_id: number; // remove once Transaction is set up and a relationship is used in the entity
}
