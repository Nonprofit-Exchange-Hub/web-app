import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories-filter.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategoryDto } from './dto/return-category.dto';

// TODO ticket for adding auth guards https://github.com/Nonprofit-Exchange-Hub/web-app/issues/84

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<ReturnCategoryDto> {
    try {
      const newCategory = await this.categoriesService.create(createCategoryDto);
      return newCategory;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Fetch categories' })
  get(@Query() getCategoriesDto: GetCategoriesDto): Promise<ReturnCategoryDto[]> {
    return this.categoriesService.getCategories(getCategoriesDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnCategoryDto> {
    const foundCategory = await this.categoriesService.findOne(parseInt(id, 10));
    if (!foundCategory) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'Category not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return foundCategory;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoriesDto: UpdateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    try {
      const updatedCategories = await this.categoriesService.update(
        parseInt(id, 10),
        updateCategoriesDto,
      );
      return updatedCategories;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    const categoryToDelete = await this.categoriesService.remove(parseInt(id));
    if (categoryToDelete.affected === 0) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'Category not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return categoryToDelete;
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate a category' })
  async validate(@Body() categories: string[]): Promise<boolean> {
    return this.categoriesService.validateCategories(categories);
  }
}
