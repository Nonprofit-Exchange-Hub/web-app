import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { DeleteResult, Repository } from 'typeorm';

import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { GetAssetsDto } from './dto/get-asset.dto';

@Injectable()
export class AssetsService {
  constructor(@InjectRepository(Asset) private assetsRepository: Repository<Asset>) {}

  async create(Asset): Promise<Asset> {
    return this.assetsRepository.save(Asset);
  }

  async findOne(id: number): Promise<Asset> {
    return this.assetsRepository.findOneBy({ id });
  }

  async getAssets(getAssetsDto: GetAssetsDto): Promise<Asset[]> {
    const { limit, offset, ...rest } = getAssetsDto;
    return (
      this.assetsRepository.find({
        where: rest,
        order: {
          datePosted: 'DESC',
        },
        skip: offset,
        take: limit,
      }) || []
    );
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    await this.assetsRepository.update(id, updateAssetDto);
    return this.assetsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.assetsRepository.delete(id);
  }
}
