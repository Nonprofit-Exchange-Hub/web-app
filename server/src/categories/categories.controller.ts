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
import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories-filter.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

// TODO ticket for adding auth guards https://github.com/Nonprofit-Exchange-Hub/web-app/issues/84

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiQuery({ type: CreateCategoryDto })
  @ApiResponse({
    description: 'Successfully created new category.',
    status: HttpStatus.CREATED,
    type: Category,
  })
  @ApiResponse({
    description: 'Confict - category already exists.',
    status: HttpStatus.CONFLICT,
  })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
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
  get(@Query() getCategoriesDto: GetCategoriesDto): Promise<Category[]> {
    return this.categoriesService.getCategories(getCategoriesDto);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Category not found.' })
  async findOne(@Param('id') id: string): Promise<Category> {
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
  @ApiBody({ type: UpdateCategoryDto })
  async update(
    @Param('id') id: string,
    @Body() updateCategoriesDto: UpdateCategoryDto,
  ): Promise<Category> {
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
  @ApiOperation({ summary: 'Delete a category.' })
  @ApiOkResponse({ description: 'Successfully deleted category.' })
  @ApiNotFoundResponse({ description: 'Category not found.' })
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
  async validate(@Body() categories: string[]): Promise<boolean> {
    return this.categoriesService.validateCategories(categories);
  }
}
