import { IsNotEmpty } from 'class-validator'
import { TransactionStatus } from '../transaction-status.enum';

export class CreateTransactionDto {

  @IsNotEmpty()
  donater_user_id: number;

  @IsNotEmpty()
  donater_organization_id: string;

  @IsNotEmpty()
  requester_id: string;

  @IsNotEmpty({ message: 'asset_id is required' })
  asset_id: string;

  // @IsNotEmpty()
  status: TransactionStatus;

  @IsNotEmpty()
  created_date: string;
}