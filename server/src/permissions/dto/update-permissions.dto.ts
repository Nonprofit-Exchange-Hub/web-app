import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionsDto } from './create-permissions.dto';

export class UpdatePermissionsDto extends PartialType(CreatePermissionsDto) {}
