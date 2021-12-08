import { IsNotEmpty, IsEnum } from 'class-validator'
import { TransactionStatus } from '../transaction-status.enum';
import { User } from 'src/users/entities/user.entity';

export class CreateTransactionDto {

  @IsNotEmpty()
  donater_user: User;

  @IsNotEmpty()
  donater_organization_id: number;

  @IsNotEmpty()
  requester_id: number;

  // custom message for example, not necessary to code
  @IsNotEmpty({ message: 'asset_id is required' })
  asset_id: number;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  created_date: Date;
}