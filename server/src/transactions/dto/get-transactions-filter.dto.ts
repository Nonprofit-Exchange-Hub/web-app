import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';

export class GetTransactionsFilterDto {
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  donater_user_id?: string;

  @IsOptional()
  @IsString()
  donater_organization_id?: string;

  @IsOptional()
  @IsString()
  requester_id?: string;

  @IsOptional()
  @IsString()
  asset_id?: string;
  
  @IsOptional()
  @IsString()
  created_date?: string;
}
