import { TransactionStatus } from '../transaction-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateTransactionStatusDto {
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
//partial