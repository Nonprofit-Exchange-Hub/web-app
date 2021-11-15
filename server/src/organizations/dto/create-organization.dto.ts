// add validations to the Dto based on the entity
export class CreateOrganizationDto {
  /*
FROM DATA MODELING:
name
description
website
phone?
address?

FROM FORM?
city
state
Entity Identifiation Number
Tax Exempt ID
IRS Nonprofit Organization Classification

as labled on form:
    org_name: string;
    city: string;
    state: string;
    ein: string;
    tax_exempt_id: string;
    nonprofit_classification: string; <--- skip this, this will be the organization_category from the data model diagram

    then the person:
    first_name: string;
    last_name: string;
    role_or_title: string;
    email: string;
    password: string;
  */
}



// import { PartialType } from '@nestjs/mapped-types';
// import { User } from '../entities/user.entity';

// export class CreateUserDto extends PartialType(User) {
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
// }

 // or

//  import { IsString } from 'class-validator';

//  export class CreateMessageDto {
//    @IsString()
//    content: string;
//  }