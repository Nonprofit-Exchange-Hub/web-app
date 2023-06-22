import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { TransactionStatus } from '../transaction-status.enum';

import { User } from 'src/acccount-manager/entities/user.entity';
import { ReturnOrganizationDto } from 'src/organizations/dto/return-organization.dto';
import { ReturnAssetDto } from 'src/assets/dto/return-asset.dto';
import { ReturnMessageDto } from 'src/messages/dto/return-message.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  donater_user: User;

  @IsOptional()
  donater_organization?: ReturnOrganizationDto;

  @IsNotEmpty({ message: 'asset is required' })
  asset: ReturnAssetDto;

  @IsOptional()
  message?: ReturnMessageDto;

  @IsOptional()
  recipient?: ReturnOrganizationDto;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}
