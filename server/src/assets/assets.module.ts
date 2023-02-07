import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Asset } from './entities/asset.entity';
import { AuthModule } from '../auth/auth.module';
import { UserOrganizationsModule } from '../user-org/user-org.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), UserOrganizationsModule, AuthModule],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [AssetsService],
})
export class AssetsModule {}
