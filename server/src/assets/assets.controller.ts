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
  UseGuards,
  Request,
} from '@nestjs/common';
import { CookieAuthGuard } from '../auth/guards/cookie-auth.guard';
import { DeleteResult } from 'typeorm';

import type { Request as ExpressRequest } from 'express';

import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { GetAssetsDto } from './dto/get-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';
import { User } from '..//users/entities/user.entity';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @UseGuards(CookieAuthGuard)
  @Post()
  async create(
    @Request() request: ExpressRequest,
    @Body() createAssetDto: CreateAssetDto,
  ): Promise<Asset | HttpException> {
    const { user } = request;

    try {
      const newAsset = await this.assetsService.create(createAssetDto, user as User);
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

  @UseGuards(CookieAuthGuard)
  @Patch(':id')
  async update(
    @Request() request: ExpressRequest,
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<Asset | HttpException> {
    const { user } = request;

    try {
      const updatedAsset = await this.assetsService.update(
        parseInt(id),
        updateAssetDto,
        user as User,
      );
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
