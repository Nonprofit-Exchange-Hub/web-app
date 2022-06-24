import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { DeleteResult, Repository } from 'typeorm';

import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { GetAssetsDto } from './dto/get-asset-filter.dto';

@Injectable()
export class AssetsService {
  constructor(@InjectRepository(Asset) private assetsRepository: Repository<Asset>) {}

  async create(Asset): Promise<Asset> {
    return this.assetsRepository.save(Asset);
  }

  async findOne(id: number): Promise<Asset> {
    return this.assetsRepository.findOne({ id });
  }

  async getAssets(getAssetsDto: GetAssetsDto): Promise<Asset[]> {
    return this.assetsRepository.find({ where: getAssetsDto }) || [];
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    await this.assetsRepository.update(id, updateAssetDto);
    return this.assetsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.assetsRepository.delete(id);
  }
}
