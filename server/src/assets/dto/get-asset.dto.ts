import { IsOptional } from 'class-validator';

import { AssetType } from '../constants';

export class GetAssetsDto {
  @IsOptional()
  id: string;

  @IsOptional()
  title: string;

  @IsOptional()
  type: AssetType;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
