import { PartialType } from '@nestjs/mapped-types';
import { IsUrl } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUrl()
  profile_image_url?: string;
}
