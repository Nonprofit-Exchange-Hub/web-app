import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Interests } from '../../shared/interests.dto';
import { InterestNamesIsArray, InterestsProps } from '../../shared/interests.validator';

export class CreateOrganizationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  doing_business_as: string;

  @ApiProperty()
  @IsNotEmpty()
  nonprofit_classification: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  website: string;

  @ApiPropertyOptional()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional()
  @IsOptional()
  twitter?: string;

  @ApiPropertyOptional()
  @IsOptional()
  instagram?: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  zip_code: string;

  @ApiProperty()
  @IsNotEmpty()
  ein: string;

  @ApiProperty()
  @IsNotEmpty()
  image_url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Validate(InterestsProps)
  @Validate(InterestNamesIsArray)
  categories?: Interests;
}
