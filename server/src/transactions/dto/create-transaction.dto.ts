import { IsNotEmpty } from 'class-validator'

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
  status: string;

  @IsNotEmpty()
  created_date: string;
}