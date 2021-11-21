import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  import { CategoriesService } from './categories.service';
  import { CreateCategoryDto } from './dto/create-category';
  import { UpdateCategoryDto } from './dto/update-category';
  // import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  //authGaurd excluded because it is outside of the scope of this PR
  import { DeleteResult } from 'typeorm';
  import { Category } from './entities/category.entity';
  
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) {}
  
    @Post()
    async create(
      @Body() createCategoryDto: CreateCategoryDto,
    ): Promise<Category | HttpException> {
      try {
        const newCategory = await this.CategoriesService.create(createCategoryDto);
        return newCategory;
      } catch (error) {
        throw new HttpException(
          { status: HttpStatus.CONFLICT, message: `${error}` },
          HttpStatus.CONFLICT,
        );
      }
    }
  
    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Category[]> {
      return this.CategoriesService.findAll();
    }
  
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category | HttpException> {
      const foundCategory = await this.CategoriesService.findOne(parseInt(id));
      if (!foundCategory) {
        throw new HttpException(
          { staus: HttpStatus.NOT_FOUND, message: 'Category not found' },
          HttpStatus.NOT_FOUND,
        );
      }
  
      return foundCategory;
    }
  
    // @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateCategoriesDto: UpdateCategoryDto,
    ): Promise<Category | HttpException> {
      try {
        const updatedCategories = await this.CategoriesService.update(
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
  
    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<DeleteResult | HttpException> {
      const categoryToDelete = await this.CategoriesService.remove(parseInt(id));
      console.log(categoryToDelete);
      if (categoryToDelete.affected === 0) {
        throw new HttpException(
          { staus: HttpStatus.NOT_FOUND, message: 'Category not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      return categoryToDelete;
    }
  }
  