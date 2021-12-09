import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_organization } from './entities/user_org.entitiy';
import { UserOrganizationsController } from './user_org.controller';
import { UserOrganizationsService } from './user_org.service';

@Module({
    imports: [TypeOrmModule.forFeature([User_organization])],
    controllers: [UserOrganizationsController],
    providers: [UserOrganizationsService]
})
export class UserOrganizationsModule { }
