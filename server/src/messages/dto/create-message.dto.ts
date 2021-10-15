import { PartialType } from '@nestjs/mapped-types';
import { Message } from '../entities/message.entity';

export class CreateMessageDto extends PartialType(Message) {
  text: text;
  created_date: Date;
  transaction_id: number; // remove one Transaction is set up and a relationship is used in the entity
}
