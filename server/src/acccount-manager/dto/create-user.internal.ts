import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

/**
 * wraps CreateUserDto and adds internal properties that are not part of the API
 * This file should not have a `.dto` prefix
 */
export class CreateUserInternal extends CreateUserDto {
  email_verified?: boolean;
}

export class UpdateUserInternal extends PartialType(UpdateUserDto) {
  emai_verified?: boolean;
  profile_image_url?: string;
}
