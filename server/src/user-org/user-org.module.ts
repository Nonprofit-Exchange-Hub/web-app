import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganization } from './entities/user-org.entity';
import { UserOrganizationsController } from './user-org.controller';
import { UserOrganizationsService } from './user-org.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization])],
  controllers: [UserOrganizationsController],
  providers: [UserOrganizationsService],
})
export class UserOrganizationsModule {}
