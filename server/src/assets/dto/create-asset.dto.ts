import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AssetType, Condition } from '../constants';

export class CreateAssetDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(AssetType)
  type: AssetType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Condition)
  condition: Condition;

  @ApiPropertyOptional()
  @IsOptional()
  imgUrls?: string[];
}
