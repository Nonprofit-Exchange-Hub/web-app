import { PartialType } from '@nestjs/mapped-types';
import { Asset } from '../entities/asset.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateAssetDto extends PartialType(Asset) {
  title: string;
  description: string;
  poster_id: User;
  type: string;
}
