import { IsNotEmpty, IsEnum } from 'class-validator'
import { TransactionStatus } from '../transaction-status.enum';

export class CreateTransactionDto {

  @IsNotEmpty()
  donater_user_id: number;

  @IsNotEmpty()
  donater_organization_id: number;

  @IsNotEmpty()
  requester_id: number;

  @IsNotEmpty({ message: 'asset_id is required' })
  asset_id: number;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  created_date: string;
}