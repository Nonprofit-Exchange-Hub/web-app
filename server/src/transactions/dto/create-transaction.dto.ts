import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionStatus } from '../transaction-status.enum';

import type { User } from '../../acccount-manager/entities/user.entity';
import type { Organization } from '../../organizations/entities/organization.entity';
import type { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  donater_user: User;

  @ApiPropertyOptional()
  @IsOptional()
  donater_organization?: Organization;

  @ApiProperty()
  @IsNotEmpty({ message: 'asset is required' })
  asset: Asset;

  @ApiPropertyOptional()
  @IsOptional()
  message?: Message;

  @ApiPropertyOptional()
  @IsOptional()
  recipient?: Organization;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}
