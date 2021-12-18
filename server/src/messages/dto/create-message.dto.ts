import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';
import { Message } from '../entities/message.entity';

export class CreateMessageDto extends PartialType(Message) {
  // TODO: use real user and pass this through to the client
  // making sure the MessageInboxView component can still fetch messages properly

  text: string;
  user: User;
  // user_id: number;
  user_first_name: string;
  transaction_id: number; // remove once Transaction is set up and a relationship is used in the entity
}
