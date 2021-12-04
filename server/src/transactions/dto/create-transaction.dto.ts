import { IsNotEmpty } from 'class-validator'
import { TransactionStatus } from '../transaction-status.enum';

export class CreateTransactionDto {

  @IsNotEmpty()
  donater_user_id: string;

  @IsNotEmpty()
  donater_organization_id: string;

  @IsNotEmpty()
  requester_id: string;

  @IsNotEmpty()
  asset_id: string;

  @IsNotEmpty()
  status: TransactionStatus;

  @IsNotEmpty()
  created_date: string;
}