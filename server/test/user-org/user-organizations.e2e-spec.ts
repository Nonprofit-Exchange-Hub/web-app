import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { Repository } from 'typeorm';

import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TEST_DB_OPTIONS } from '../testing-constants';
import { Organization } from '../../src/organizations/entities/organization.entity';
import { CreateOrganizationDto } from '../../src/organizations/dto/create-organization.dto';
import { UserOrganization } from '../../src/user-org/entities/user-org.entity';
import { CreateUserOrganizationDto } from '../../src/user-org/dto/create-user-org.dto';
import { CreateUserDto } from '../../src/acccount-manager/dto/create-user.dto';
import { UserOrganizationsModule } from '../../src/user-org/user-org.module';
import { UserOrganizationsController } from '../../src/user-org/user-org.controller';
import { User } from '../../src/acccount-manager/entities/user.entity';

import { StubGen } from '../stubs/stub-factory';
import { OrganizationsModule } from '../../src/organizations/organizations.module';
import { AcccountManagerModule } from '../../src/acccount-manager/acccount-manager.module';

describe('UserOrgsController', () => {
  let app: INestApplication;
  let repository: Repository<UserOrganization>;
  let userRepository: Repository<User>;
  let orgRepository: Repository<Organization>;

  const orgSeed: CreateOrganizationDto = StubGen.createOrgDto();

  const userSeed: CreateUserDto = StubGen.createUserDto();

  const userOrg: CreateUserOrganizationDto = StubGen.createUserOrgDto(userSeed, orgSeed);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserOrganizationsModule,
        TypeOrmModule.forRoot(TEST_DB_OPTIONS),
        AcccountManagerModule,
        OrganizationsModule,
      ],
      controllers: [UserOrganizationsController],
      providers: [
        { provide: getRepositoryToken(UserOrganization), useClass: Repository },
        { provide: getRepositoryToken(Organization), useClass: Repository },
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    app = module.createNestApplication();
    repository = module.get(getRepositoryToken(UserOrganization));
    userRepository = module.get(getRepositoryToken(User));
    orgRepository = module.get(getRepositoryToken(Organization));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const [savedUser, savedOrg] = await Promise.all([
      userRepository.createQueryBuilder().insert().into(User).values(userSeed).execute(),
      orgRepository.createQueryBuilder().insert().into(Organization).values(orgSeed).execute(),
    ]);
    const savedUserOrg = await repository
      .createQueryBuilder()
      .insert()
      .into(UserOrganization)
      .values({
        ...userOrg,
        user: { ...userSeed, id: savedUser.identifiers['id'] },
        organization: { ...orgSeed, id: savedOrg.identifiers['id'] },
      })
      .execute();
    expect(savedUserOrg).not.toBeNull();
  });

  afterEach(async () => {
    await repository.query(`TRUNCATE user_organizations CASCADE;`);
    await userRepository.query(`TRUNCATE users CASCADE;`);
    await orgRepository.query(`TRUNCATE organizations CASCADE;`);
  });

  it('POST /userOrganizations -> when user exists should return 409', async () => {
    const requestBody = {
      ...userOrg,
      user: { ...userSeed },
      organization: { ...orgSeed, name: 'Something else', ein: '01-1234567' },
    };
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/userOrganizations`)
      .send({ ...requestBody })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);
    expect(body.message).toEqual('Email already exists');
  });

  // not yet implemented, so skipping for now
  it.skip('POST /userOrganizations -> when ORG exists by name should return 409', async () => {
    const requestBody = {
      ...userOrg,
      organization: { ...orgSeed, ein: '01-1234567' },
      user: { ...userSeed, email: 'anotheremail@test.com' },
    };

    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/userOrganizations`)
      .send({ ...requestBody })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);
    expect(body.message).toEqual('This organization already exists');
  });

  it('POST /userOrganizations -> when ORG exists by EIN should return 409', async () => {
    const requestBody = {
      ...userOrg,
      organization: { ...orgSeed, name: 'anything' },
      user: { ...userSeed, email: 'anyrandomemail@test.com' },
    };

    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/userOrganizations`)
      .send({ ...requestBody })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);
    expect(body.message).toEqual('This organization already exists');
  });

  it('POST /userOrganizations -> when unique, should return 201', async () => {
    const requestBody = {
      ...userOrg,
      user: { ...userSeed, email: 'somethingelse@no.com' },
      organization: {
        ...orgSeed,
        name: 'Anything else',
        ein: '01-1234567',
      },
    };

    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/userOrganizations`)
      .send({ ...requestBody })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(body.message).toBeUndefined();
  });
});
