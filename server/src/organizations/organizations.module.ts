import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganizationsController } from './organizations.controller';
import { Organization } from './entities/organization.entity'
import { HttpModule } from '@nestjs/axios';

@Module({
  // registerAsync was recommended by docs: https://docs.nestjs.com/techniques/http-module
  imports:[TypeOrmModule.forFeature([Organization]), HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  })],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}
