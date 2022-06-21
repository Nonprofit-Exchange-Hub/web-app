import { IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  ein: string;
}
