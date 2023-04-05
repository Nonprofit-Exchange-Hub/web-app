import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcccountManagerModule } from '../acccount-manager/acccount-manager.module';
import { UsersService } from '../acccount-manager/user.service';
import { Organization } from '../organizations/entities/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../acccount-manager/entities/user.entity';
import { UserOrganization } from './entities/user-org.entity';
import { UserOrganizationsController } from './user-org.controller';
import { UserOrganizationsService } from './user-org.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrganization, User, Organization]),
    AcccountManagerModule,
    CategoriesModule,
  ],
  controllers: [UserOrganizationsController],
  providers: [UserOrganizationsService, UsersService, OrganizationsService],
  exports: [UserOrganizationsService],
})
export class UserOrganizationsModule {}
