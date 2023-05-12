import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Asset } from './entities/asset.entity';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { GetAssetsDto } from './dto/get-asset.dto';
import { User } from '../acccount-manager/entities/user.entity';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
  constructor(@InjectRepository(Asset) private assetsRepository: Repository<Asset>) {}

  async create(createAssetDto: CreateAssetDto, poster: User): Promise<Asset> {
    return this.assetsRepository.save({ ...createAssetDto, poster });
  }

  async findOne(id: number): Promise<Asset> {
    return this.assetsRepository.findOneBy({ id });
  }

  async getAssets(getAssetsDto: GetAssetsDto): Promise<Asset[]> {
    const { limit, offset, search, ...rest } = getAssetsDto;
    if (search) {
      return this.assetsRepository
        .createQueryBuilder()
        .select('asset')
        .from(Asset, 'asset')
        .where(`"asset"."searchtitle" @@ plainto_tsquery('english', :query)`, {
          query: `${search}`,
        })
        .orderBy(`plainto_tsquery('english', :query)`, 'DESC')
        .limit(limit)
        .getMany();
    } else {
      return (
        this.assetsRepository.find({
          where: { ...rest },
          order: {
            datePosted: 'DESC',
          },
          skip: offset,
          take: limit,
        }) || []
      );
    }
  }

  async update(id: number, updateAssetDto: UpdateAssetDto, poster: User): Promise<Asset> {
    await this.assetsRepository.update(id, { ...updateAssetDto, poster });
    return this.assetsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.assetsRepository.delete(id);
  }
}
