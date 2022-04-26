import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { TransactionStatus } from '../transaction-status.enum';

import type { User } from '../../users/entities/user.entity';
import type { Organization } from '../../organizations/entities/organization.entity';
import type { Asset } from '../../assets/entities/asset.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  donater_user: Pick<User, 'id'>;

  @IsOptional()
  donater_organization: Pick<Organization, 'id'>;

  @IsOptional()
  recipient: Pick<Organization, 'id'>;

  @IsNotEmpty({ message: 'asset_id is required' })
  asset: Pick<Asset, 'id'>;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
