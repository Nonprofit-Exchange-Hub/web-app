import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  user: Pick<User, 'id'>;

  @IsNotEmpty()
  transaction: Pick<Transaction, 'id'>;
}
