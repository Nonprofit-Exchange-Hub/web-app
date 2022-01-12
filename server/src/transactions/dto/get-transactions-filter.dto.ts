import { TransactionStatus } from '../transaction-status.enum';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Asset } from '../../assets/entities/asset.entity'
import { PartialType } from '@nestjs/mapped-types';
import { Transaction } from '../entities/transaction.entity';

export class GetTransactionsFilterDto extends PartialType(Transaction){

  status?: TransactionStatus;


  donater_user?: User;

  
  donater_organization?: Organization;


  recipient?: Organization;

  
  assets?: Asset[];

 
  created_date?: Date;
}
