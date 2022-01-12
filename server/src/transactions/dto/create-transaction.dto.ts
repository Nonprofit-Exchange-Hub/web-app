import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';
import type { User } from 'src/users/entities/user.entity';
import type { Organization } from 'src/organizations/entities/organization.entity';
import type { Asset } from 'src/assets/entities/asset.entity';

export class CreateTransactionDto {
  @IsOptional()
  @IsNotEmpty()
  donater_user: User;

  donater_organization?: Organization;

  @IsOptional()
  @IsNotEmpty()
  recipient: Organization;

  // custom message for example, not necessary to code
  @IsOptional()
  @IsNotEmpty({ message: 'asset_id is required' })
  asset: Asset;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsOptional()
  @IsNotEmpty()
  created_date: Date;
}
