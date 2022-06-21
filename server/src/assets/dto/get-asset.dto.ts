import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';

import { Asset } from '../entities/asset.entity';

export class GetAssetsDto extends PartialType(Asset) {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
