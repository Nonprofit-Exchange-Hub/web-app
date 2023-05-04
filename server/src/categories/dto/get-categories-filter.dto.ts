import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateCategoryDto } from './create-category.dto';

export class GetCategoriesDto extends CreateCategoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  name: string;
}
