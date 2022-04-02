import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { TransactionStatus } from '../transaction-status.enum';

import type { Organization } from '../../organizations/entities/organization.entity';
import type { Asset } from '../../assets/entities/asset.entity';

export class CreateTransactionDto {
  @IsOptional()
  recipient: Organization;

  @IsNotEmpty()
  asset: Asset;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
