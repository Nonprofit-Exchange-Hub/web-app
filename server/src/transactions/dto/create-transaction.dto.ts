import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { TransactionStatus } from '../transaction-status.enum';

import type { User } from '../../users/entities/user.entity';
import type { Organization } from '../../organizations/entities/organization.entity';
import type { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  donater_user: User;

  @IsOptional()
  donater_organization?: Organization;

  @IsNotEmpty({ message: 'asset is required' })
  asset: Asset;

  @IsOptional()
  message?: Message;

  @IsOptional()
  recipient?: Organization;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}
