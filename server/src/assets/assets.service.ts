import { Injectable } from '@nestjs/common';
import { Asset } from './entities/asset.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private assetsRepository: Repository<Asset>,
  ) {}

  async create(CreateAssetDto: CreateAssetDto): Promise<Asset> {
    return this.assetsRepository.save(CreateAssetDto);
  }

  async findAll(): Promise<Asset[]> {
    return this.assetsRepository.find();
  }

  async findOne(id: number): Promise<Asset> {
    return this.assetsRepository.findOne({ id });
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    await this.assetsRepository.update(id, updateAssetDto);
    return this.assetsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.assetsRepository.delete(id);
  }
}
