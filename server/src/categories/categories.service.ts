import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.categoriesRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.categoriesRepository.delete(id);
  }
}
