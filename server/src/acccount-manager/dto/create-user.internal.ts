import { UpdateUserDto } from './update-user.dto';

/**
 * wraps CreateUserDto and adds internal properties that are not part of the API
 * This file should not have a `.dto` prefix
 */
export class UpdateUserInternal extends UpdateUserDto {
  email_verified?: boolean;
}
