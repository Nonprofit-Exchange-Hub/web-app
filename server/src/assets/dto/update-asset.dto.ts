import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';

import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @Exclude()
  searchtitle: string;
}
