import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { TransactionStatus } from '../transaction-status.enum';

import type { User } from '../../acccount-manager/entities/user.entity';
import type { Organization } from '../../organizations/entities/organization.entity';
import type { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';
import { CreateTransactionDto } from './create-transaction.dto';

export class ReturnTransactionDto extends CreateTransactionDto {
  @IsNotEmpty()
  id: number;
}
