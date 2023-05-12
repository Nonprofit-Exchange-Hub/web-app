import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Transaction } from '../../transactions/entities/transaction.entity';

export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  transaction: Transaction;
}
