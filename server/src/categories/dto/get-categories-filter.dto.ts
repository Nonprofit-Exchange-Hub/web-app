import { IsOptional } from 'class-validator';

import { CreateCategoryDto } from './create-category.dto';

export class GetCategoriesDto extends CreateCategoryDto {
  @IsOptional()
  id: number;

  @IsOptional()
  name: string;
}
