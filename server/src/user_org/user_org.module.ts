import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganization } from './entities/user_org.entitiy';
import { UserOrganizationsController } from './user_org.controller';
import { UserOrganizationsService } from './user_org.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserOrganization])],
    controllers: [UserOrganizationsController],
    providers: [UserOrganizationsService]
})
export class UserOrganizationsModule { }
