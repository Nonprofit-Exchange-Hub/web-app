import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../organizations/entities/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserOrganization } from './entities/user-org.entity';
import { UserOrganizationsController } from './user-org.controller';
import { UserOrganizationsService } from './user-org.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization, User, Organization])],
  controllers: [UserOrganizationsController],
  providers: [UserOrganizationsService, UsersService, OrganizationsService],
  exports: [UserOrganizationsService],
})
export class UserOrganizationsModule {}
