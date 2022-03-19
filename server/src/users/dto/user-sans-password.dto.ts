import { ArrayContains, IsEmail, IsNotEmpty, IsEmpty, IsInt, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { UserOrganization } from '../../user-org/entities/user-org.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

export class UserSansPasswordDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEmpty()
  password: undefined;

  @IsArray()
  @Type(() => Asset)
  assets: Asset[];

  @IsArray()
  @Type(() => Transaction)
  transactions: Transaction[];

  @IsArray()
  @Type(() => Message)
  messages: Message[];

  @IsArray()
  @Type(() => UserOrganization)
  organizations: UserOrganization[];
}
