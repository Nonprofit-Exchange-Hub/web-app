// import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Asset } from '../../assets/entities/asset.entity'
import { PartialType } from '@nestjs/mapped-types';
import { Transaction } from '../entities/transaction.entity';

export class GetTransactionsFilterDto extends PartialType(Transaction){
  // @IsOptional()
  // @IsString()
  status?: TransactionStatus;

  // @IsOptional()
  // @IsNumber()
  donater_user?: User;

  // @IsOptional()
  // @IsNumber()
  donater_organization?: Organization;

  // @IsOptional()
  // @IsNumber()
  recipient?: Organization;

  // @IsOptional()
  // @IsNumber()
  assets?: Asset[];

  // @IsOptional()
  // @IsDate()
  created_date?: Date;
}
