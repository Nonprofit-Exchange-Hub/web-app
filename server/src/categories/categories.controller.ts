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
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';
import { Category } from './entities/category.entity';
import { DeleteResult } from 'typeorm';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | HttpException> {
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
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category | HttpException> {
    const foundCategory = await this.categoriesService.findOne(parseInt(id));
    if (!foundCategory) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'Category not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return foundCategory;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoriesDto: UpdateCategoryDto,
  ): Promise<Category | HttpException> {
    try {
      const updatedCategories = await this.categoriesService.update(
        parseInt(id),
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
  async remove(@Param('id') id: string): Promise<DeleteResult | HttpException> {
    const categoryToDelete = await this.categoriesService.remove(parseInt(id));
    if (categoryToDelete.affected === 0) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'Category not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return categoryToDelete;
  }
}
