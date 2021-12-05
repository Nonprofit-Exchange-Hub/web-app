import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';

export class GetTransactionsFilterDto {
  // Why is this causing an error?   {
//     "statusCode": 400,
//     "message": [
//         "status must be a valid enum value"
//     ],
//     "error": "Bad Request"
// }
  // @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  donater_user_id?: number;

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
