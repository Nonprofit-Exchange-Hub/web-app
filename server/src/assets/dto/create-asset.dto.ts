import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { User } from '../../users/entities/user.entity';
import { AssetType, Condition } from '../constants';

export class CreateAssetDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  poster: User;

  @IsOptional()
  @IsEnum(AssetType)
  type: AssetType;

  @IsOptional()
  @IsEnum(Condition)
  condition: Condition;
}
