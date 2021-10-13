import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private assetsRepository: Repository<Asset>,
  ) {}

  async create(CreateAssetDto: CreateAssetDto) {
    return this.assetsRepository.save(CreateAssetDto);
  }

  findAll() {
    return this.assetsRepository.find();
  }

  async findOne(id: number) {
    const asset = await this.assetsRepository.findOne({ id });
    if (!asset) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Asset id not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return asset;
  }

  async update(id: number, UpdateAssetDto: UpdateAssetDto) {
    const asset = await this.assetsRepository.findOne({ id });
    if (!asset) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Asset id not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.assetsRepository.update(id, UpdateAssetDto);
    return this.assetsRepository.findOne(id);
  }

  async remove(id: number) {
    const asset = await this.assetsRepository.findOne({ id });
    if (!asset) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Asset id not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.assetsRepository.delete(id);
  }
}
