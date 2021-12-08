import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Asset } from 'src/assets/entities/asset.entity';

export class GetTransactionsFilterDto {
  @IsOptional()
  @IsString()
  status: TransactionStatus;

  // unclear as to the value/conflict of having both @IsOptional and ?
  @IsOptional()
  @IsNumber()
  donater_user?: User;

  @IsOptional()
  @IsNumber()
  donater_organization?: Organization;

  // @IsOptional()
  // @IsNumber()
  // requester_id?: number;

  @IsOptional()
  @IsNumber()
  assets?: Asset[];
  
  @IsOptional()
  @IsDate()
  created_date?: Date;
}

