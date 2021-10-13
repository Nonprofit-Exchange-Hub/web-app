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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateAssetDto: CreateAssetDto) {
    return this.assetsService.create(CreateAssetDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(parseInt(id));
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(parseInt(id), UpdateAssetDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(parseInt(id));
  }
}
