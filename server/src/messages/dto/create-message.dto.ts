import { IsNotEmpty, IsOptional } from 'class-validator';

import { Transaction } from '../../transactions/entities/transaction.entity';
import { User } from 'src/acccount-manager/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  transaction: Transaction;

  @IsNotEmpty()
  sending_user: User;

  @IsOptional()
  sending_org: Organization;
}
