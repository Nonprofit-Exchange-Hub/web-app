import { IsEnum, IsOptional } from "class-validator";
import { TransactionStatus } from "../transaction-status.enum";

export class GetTransactionsFilterDto{
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus

  // @IsOptional()
  // @IsString()
  // search?: string
}