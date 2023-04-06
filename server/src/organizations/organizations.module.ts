import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { Organization } from './entities/organization.entity';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, TransactionsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
