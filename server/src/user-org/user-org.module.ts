import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcccountManagerModule } from '../acccount-manager/acccount-manager.module';
import { UsersV2Service } from '../acccount-manager/userv2.service';
import { Organization } from '../organizations/entities/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../users/entities/user.entity';
import { UserOrganization } from './entities/user-org.entity';
import { UserOrganizationsController } from './user-org.controller';
import { UserOrganizationsService } from './user-org.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrganization, User, Organization]),
    AcccountManagerModule,
  ],
  controllers: [UserOrganizationsController],
  providers: [UserOrganizationsService, UsersV2Service, OrganizationsService],
  exports: [UserOrganizationsService],
})
export class UserOrganizationsModule {}
