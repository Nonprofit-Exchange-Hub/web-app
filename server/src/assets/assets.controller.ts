import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { GetAssetsDto } from './dto/get-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() createAssetDto: CreateAssetDto): Promise<Asset | HttpException> {
    try {
      const newAsset = await this.assetsService.create(createAssetDto);
      return newAsset;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get()
  get(@Query() getAssetsDto: GetAssetsDto): Promise<Asset[]> {
    return this.assetsService.getAssets(getAssetsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Asset | HttpException> {
    const foundAsset = await this.assetsService.findOne(parseInt(id));
    if (!foundAsset) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Asset not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return foundAsset;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<Asset | HttpException> {
    try {
      const updatedAsset = await this.assetsService.update(parseInt(id), updateAssetDto);
      return updatedAsset;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult | HttpException> {
    const assetToDelete = await this.assetsService.remove(parseInt(id));
    console.log(assetToDelete);
    if (assetToDelete.affected === 0) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'Asset not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return assetToDelete;
  }
}
