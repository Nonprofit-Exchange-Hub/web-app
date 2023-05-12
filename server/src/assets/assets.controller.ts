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
import { DeleteResult } from 'typeorm';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import type { Request as ExpressRequest } from 'express';

import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { GetAssetsDto } from './dto/get-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';
import { User } from '../acccount-manager/entities/user.entity';
import { CookieAuthGuard } from '../acccount-manager/guards/cookie-auth.guard';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @UseGuards(CookieAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create an asset' })
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
  @ApiOperation({ summary: 'Fetch assets' })
  get(@Query() getAssetsDto: GetAssetsDto): Promise<Asset[]> {
    return this.assetsService.getAssets(getAssetsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch an asset by ID' })
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
  @ApiOperation({ summary: 'Update an asset' })
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
  @ApiOperation({ summary: 'Delete an asset' })
  async remove(@Param('id') id: string): Promise<DeleteResult | HttpException> {
    const assetToDelete = await this.assetsService.remove(parseInt(id));

    if (assetToDelete.affected === 0) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'Asset not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return assetToDelete;
  }
}
