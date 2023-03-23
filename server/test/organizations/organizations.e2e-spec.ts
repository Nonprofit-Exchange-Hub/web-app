import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { Repository } from 'typeorm';

import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TEST_DB_OPTIONS } from '../testing-constants';
import { Organization } from '../../src/organizations/entities/organization.entity';
import { OrganizationsController } from '../../src/organizations/organizations.controller';
import { OrganizationsModule } from '../../src/organizations/organizations.module';
import { OrganizationsService } from '../../src/organizations/organizations.service';
import { CreateOrganizationDto } from '../../src/organizations/dto/create-organization.dto';
import { StubGen } from '../stubs/stub-factory';

describe('OrganizationsController', () => {
  let app: INestApplication;
  let orgService: OrganizationsService;
  let repository: Repository<Organization>;

  const seed: CreateOrganizationDto = StubGen.createOrgDto();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrganizationsModule, TypeOrmModule.forRoot(TEST_DB_OPTIONS)],
      controllers: [OrganizationsController],
      providers: [{ provide: getRepositoryToken(Organization), useClass: Repository }],
    }).compile();

    app = module.createNestApplication();
    orgService = module.get<OrganizationsService>(OrganizationsService);
    repository = module.get(getRepositoryToken(Organization));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // seed data
    await orgService.create({ ...seed });
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM organizations;`);
  });

  it('POST /organizations -> when org exists -> match on name, should return 409', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/organizations`)
      .send({ ...seed, ein: '01-1234567' })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);
    expect(body.message).toEqual('HttpException: This organization already exists');
  });

  it('POST /organizations -> when org exists -> match on ein, should return 409', async () => {
    // extect to have 2 orgs with the same name and 2 orgs with the same ein
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/organizations`)
      .send({ ...seed, name: 'sprockets, inc' }) // existing but with different name
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);
    expect(body.message).toEqual('HttpException: This organization already exists');
  });

  it('POST /organizations -> when org categories does not have names key -> should return 400', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/organizations`)
      .send({ ...seed, categories: ['Environment'] })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(body.message).toEqual([
    "interests names must contain a valid array of strings",
    "interests must contain a names key"
  ]);
  });
});
