import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from './create-asset.dto';

//look at nest docs
export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
