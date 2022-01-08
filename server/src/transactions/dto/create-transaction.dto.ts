import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Asset } from 'src/assets/entities/asset.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  donater_user: User;

  @IsOptional()
  donater_organization: Organization;

  @IsNotEmpty()
  recipient: Organization;

  // custom message for example, not necessary to code
  @IsNotEmpty({ message: 'asset_id is required' })
  asset: Asset;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  created_date: Date;
}
