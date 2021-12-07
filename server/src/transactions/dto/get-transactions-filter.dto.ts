import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';

export class GetTransactionsFilterDto {
  @IsOptional()
  @IsString()
  status: TransactionStatus;

  // unclear as to the value/conflict of having both @IsOptional and ?
  @IsOptional()
  @IsNumber()
  donater_user_id?: number;

  @IsOptional()
  @IsNumber()
  donater_organization_id?: number;

  @IsOptional()
  @IsNumber()
  requester_id?: number;

  @IsOptional()
  @IsNumber()
  asset_id?: number;
  
  @IsOptional()
  @IsDate()
  created_date?: Date;
}

  // potential future use
  // @IsOptional()
  // @IsString()
  // search?: string;