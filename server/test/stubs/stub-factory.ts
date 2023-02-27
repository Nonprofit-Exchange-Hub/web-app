import { CreateUserDto } from '../../src/acccount-manager/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { CreateOrganizationDto } from '../../src/organizations/dto/create-organization.dto';
import { CreateUserOrganizationDto } from '../../src/user-org/dto/create-user-org.dto';
import { ApprovalStatus, Role } from '../../src/user-org/constants';
import { CreateAssetDto } from '../../src/assets/dto/create-asset.dto';
import { AssetType, Condition } from '../../src/assets/constants';

/**
 * Generates stubs using a faker library
 */
export class StubGen {
  /**
   *
   * @returns CreateUserDto
   */
  public static createUserDto(): CreateUserDto {
    return {
      firstName: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'Secret1234%',
      email_notification_opt_out: false,
      city: 'Seattle',
      state: 'WA',
      zip_code: '98101',
    };
  }

  public static createOrgDto(): CreateOrganizationDto {
    const COMPANY_NAME = faker.company.name();
    return {
      name: COMPANY_NAME,
      doing_business_as: COMPANY_NAME,
      description: faker.lorem.paragraph(),
      website: faker.internet.url(),
      address: faker.address.streetAddress(),
      phone: '123-456-7891',
      city: faker.address.city(),
      state: faker.address.state(),
      zip_code: faker.address.zipCode(),
      ein: `${faker.random.numeric(2, { allowLeadingZeros: false })}-${faker.random.numeric(6, {
        allowLeadingZeros: false,
      })}`,
      nonprofit_classification: 'FAKE',
      image_url: 'https://docs.nestjs.com/assets/logo-small.svg',
    };
  }

  public static createUserOrgDto(
    createUserDto: CreateUserDto,
    createOrgDto: CreateOrganizationDto,
  ): CreateUserOrganizationDto {
    return {
      role: Role.owner,
      approvalStatus: ApprovalStatus.approved,
      organization: { ...createOrgDto },
      user: { ...createUserDto },
    };
  }

  // Assets //
  public static createAssetDto(): CreateAssetDto {
    return {
      title: faker.commerce.product(),
      description: faker.lorem.paragraph(1),
      quantity: 1,
      type: AssetType.DONATION,
      condition: Condition.EXCELLENT,
      imgUrls: ['https://google.com'],
    };
  }
}
