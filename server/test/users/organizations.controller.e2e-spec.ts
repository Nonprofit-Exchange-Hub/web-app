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

describe('OrganizationsController', () => {
  let app: INestApplication;
  let orgService: OrganizationsService;
  let repository: Repository<Organization>;

  const seed: CreateOrganizationDto = {
    name: 'acme, inc',
    doing_business_as: 'acme, inc',
    description: 'beep beep',
    website: 'example.com',
    address: '123 some ave',
    phone: '123-456-7891',
    city: 'Gotham',
    state: 'NX',
    ein: '99-999999',
    nonprofit_classification: 'FAKE',
  };

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

  beforeEach(async () => {
    // seed data
    await orgService.create({ ...seed });
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM organizations;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /organizations', () => {
    it('should return 409 with message when org already exists', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/organizations`)
        .send({ ...seed })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409);
      expect(body.message).toEqual('Error: This organization already exists');
    });
  });
});
