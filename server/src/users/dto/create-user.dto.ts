import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto extends PartialType(User) {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: UserRole;
}
