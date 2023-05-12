import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { AssetType } from '../constants';

export class GetAssetsDto {
  @ApiPropertyOptional()
  @IsOptional()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  type: AssetType;

  @ApiPropertyOptional()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  search: string;

  @IsOptional()
  offset: number;
}
