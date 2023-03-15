import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories-filter.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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

  async validateCategories(categories: string[]): Promise<boolean> {
    const found = await this.categoriesRepository.countBy({
      name: In(categories),
    });
    return found === categories.length;
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
