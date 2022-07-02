import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories-filter.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoriesRepository.save(createCategoryDto);
    return newCategory;
  }

  async getCategories(getCategoriesDto: GetCategoriesDto): Promise<Category[]> {
    return this.categoriesRepository.find({ where: getCategoriesDto });
  }

  async findOne(id: number): Promise<Category> {
    const category = this.categoriesRepository.findOneBy({ id });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.categoriesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    const deleteResult = this.categoriesRepository.delete(id);
    return deleteResult;
  }
}
