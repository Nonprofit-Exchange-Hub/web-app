import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { TransactionStatus } from '../transaction-status.enum';

import { ReturnUserDto } from 'src/acccount-manager/dto/auth.dto';
import { ReturnOrganizationDto } from 'src/organizations/dto/return-organization.dto';
import { ReturnAssetDto } from 'src/assets/dto/return-asset.dto';
import { ReturnMessageDto } from 'src/messages/dto/return-message.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  donater_user: ReturnUserDto;

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
