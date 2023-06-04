import { IsOptional } from 'class-validator';

import { AssetType } from '../constants';
import { ReturnUserDto } from 'src/acccount-manager/dto/auth.dto';

export class ReturnAssetDto {
  @IsOptional()
  id: number;

  @IsOptional()
  title: string;

  @IsOptional()
  type: AssetType;

  @IsOptional()
  poster: ReturnUserDto;
}
