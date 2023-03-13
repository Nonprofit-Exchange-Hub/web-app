import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { UserInterestNamesIsArray, UserInterestsProps } from './user-interest.validator';

export class OrgCategories {
  @IsNotEmpty()
  names: string[];
}

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
  @Validate(UserInterestsProps)
  @Validate(UserInterestNamesIsArray) //get from user-interest.validator, move that file to shared version
  categories?: OrgCategories;
}
