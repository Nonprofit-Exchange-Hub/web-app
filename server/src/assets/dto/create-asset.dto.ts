import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { AssetType, Condition } from '../constants';

export class CreateAssetDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsEnum(AssetType)
  type: AssetType;

  @IsOptional()
  @IsEnum(Condition)
  condition: Condition;

  @IsOptional()
  imgUrls?: string[];
}
