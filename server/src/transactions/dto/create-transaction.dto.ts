import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';

import type { User } from 'src/users/entities/user.entity';
import type { Organization } from 'src/organizations/entities/organization.entity';
import type { Asset } from 'src/assets/entities/asset.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  donater_user: User;

  @IsOptional()
  donater_organization: Organization;

  @IsOptional()
  recipient: Organization;

  // custom message for example, not necessary to code
  @IsNotEmpty({ message: 'asset_id is required' })
  asset: Asset;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsOptional()
  @IsNotEmpty()
  created_date: Date;
}
