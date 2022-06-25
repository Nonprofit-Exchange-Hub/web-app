import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
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
