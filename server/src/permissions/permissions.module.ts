import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../organizations/entities/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Permissions } from './entities/permissions.entity';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions, User, Organization])],
  providers: [PermissionsService, UsersService, OrganizationsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
