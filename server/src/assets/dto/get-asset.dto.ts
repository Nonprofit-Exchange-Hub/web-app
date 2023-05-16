import { IsOptional } from 'class-validator';

import { AssetType } from '../constants';

export class GetAssetsDto {
  @IsOptional()
  id: number;

  @IsOptional()
  title: string;

  @IsOptional()
  type: AssetType;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  offset: number;
}
