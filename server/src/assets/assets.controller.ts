import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Asset } from './entities/asset.entity';
import { DeleteResult } from 'typeorm';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAssetDto: CreateAssetDto): Promise<Asset> {
    return this.assetsService.create(createAssetDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Asset[]> {
    return this.assetsService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Asset> {
    return this.assetsService.findOne(parseInt(id));
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<Asset> {
    return this.assetsService.update(parseInt(id), updateAssetDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.assetsService.remove(parseInt(id));
  }
}
