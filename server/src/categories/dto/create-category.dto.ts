import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  applies_to_assets: boolean;

  @IsOptional()
  applies_to_organizations: boolean;
}
