import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganization } from './entities/userOrganization.entity';
import { UserOrganizationsController } from './userOrganizations.controller';
import { UserOrganizationsService } from './userOrganizations.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization])],
  controllers: [UserOrganizationsController],
  providers: [UserOrganizationsService],
})
export class UserOrganizationsModule {}
