import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { TransactionStatus } from '../transaction-status.enum';

import type { Organization } from '../../organizations/entities/organization.entity';
import type { Asset } from '../../assets/entities/asset.entity';
import type { User } from '../../users/entities/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  recipient: Organization;

  @IsNotEmpty()
  asset: Asset;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  poster: User;

  @IsOptional()
  posterOrganization: Organization;
}
