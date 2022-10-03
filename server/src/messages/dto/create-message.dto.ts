import { IsNotEmpty } from 'class-validator';

import { Transaction } from '../../transactions/entities/transaction.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  transaction: Transaction;
}
