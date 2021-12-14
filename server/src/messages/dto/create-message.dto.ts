import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';
import { Message } from '../entities/message.entity';

export class CreateMessageDto extends PartialType(Message) {
  text: string;
  user: User;
  transaction_id: number; // remove once Transaction is set up and a relationship is used in the entity
}
