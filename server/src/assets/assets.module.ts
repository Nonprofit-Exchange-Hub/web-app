import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Asset } from './entities/asset.entity';
import { AcccountManagerModule } from '../acccount-manager/acccount-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), AcccountManagerModule],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [AssetsService],
})
export class AssetsModule {}
