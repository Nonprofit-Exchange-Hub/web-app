import { IsNotEmpty, IsOptional, Validate } from 'class-validator';

import { Interests } from '../../shared/interests.dto';
import { InterestNamesIsArray, InterestsProps } from '../../shared/interests.validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  doing_business_as: string;

  @IsNotEmpty()
  nonprofit_classification: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  website: string;

  @IsOptional()
  facebook?: string;

  @IsOptional()
  twitter?: string;

  @IsOptional()
  instagram?: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zip_code: string;

  @IsNotEmpty()
  ein: string;

  @IsNotEmpty()
  image_url: string;

  @IsOptional()
  @Validate(InterestsProps)
  @Validate(InterestNamesIsArray)
  categories?: Interests;
}
