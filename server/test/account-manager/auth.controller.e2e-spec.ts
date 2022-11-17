import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { Repository } from 'typeorm';
import { userCreateDtoStub } from '../stubs';
import { User } from '../../src/account-manager/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TEST_DB_OPTIONS } from '../testing-constants';
import { FilesService } from '../../src/files/files.service';
import { UsersService } from '../../src/account-manager/users.service';
import { AccountManagerModule } from '../../src/account-manager/account-manager.module';
import { AuthController } from '../../src/account-manager/auth.controller';

describe('UsersController', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let repository: Repository<User>;

  let existingRecordId = 0;
  const seed = () => ({
    firstName: 'peter',
    last_name: 'parker',
    email: 'peter.parker@example.com',
    password: 'secret1234',
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountManagerModule, TypeOrmModule.forRoot(TEST_DB_OPTIONS)],
      controllers: [AuthController],
      providers: [{ provide: getRepositoryToken(User), useClass: Repository }, FilesService],
    }).compile();

    app = module.createNestApplication();
    usersService = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
    // jest.clearAllMocks();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Register users', () => {
    beforeEach(async () => await bootstrapBeforeEach());
    afterEach(async () => await bootstrapAfterEach());

    it('should register and return created user', async () => {
      const userToCreate = userCreateDtoStub();
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/auth/register`)
        .send(userCreateDtoStub())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      expect(body.id).not.toBeNull();
      expect(body.email).toEqual(userToCreate.email);
      expect(body.firstName).toEqual(userToCreate.firstName);
      expect(body.last_name).toEqual(userToCreate.last_name);
      expect(body.password).toBeUndefined();
    });

    // not yet implemented, so skipping for now
    it.skip('should return 403 when email validations fails', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/auth/register`)
        .send({
          ...userCreateDtoStub(),
          email: 'bademail.com',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
    });

    it('should return 409 with message when email already exists', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/auth/register`)
        .send({ ...seed })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409);
      expect(body.message).toEqual('Email already exists');
    });
  });

  describe('Get /auth/users/{id}', () => {
    beforeEach(async () => await bootstrapBeforeEach());
    afterEach(async () => await bootstrapAfterEach());

    it('should return 200 with existing record', async () => {
      // assert
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/auth/users/${existingRecordId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body).not.toBeUndefined();
      expect(body.id).not.toBeNull();
      expect(body.email).toEqual(seed().email);
      expect(body.firstName).toEqual(seed().firstName);
      expect(body.last_name).toEqual(seed().last_name);
    });

    it('should not return password hash', async () => {
      // assert
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/auth/users/${existingRecordId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body).not.toBeUndefined();
      expect(body.password).toBeUndefined();
    });

    // not yet implemented, so skipping for now
    it.skip("should 404 when record doesn't exist", async () => {
      // assert
      await supertest
        .agent(app.getHttpServer())
        .get(`/auth/users/10000`)
        .set('Accept', 'application/json')
        .expect(404);
    });
  });

  describe('PATCH users/{id}', () => {
    beforeEach(async () => await bootstrapBeforeEach());
    afterEach(async () => await bootstrapAfterEach());

    it.skip('should return 403 when email validations fails', async () => {
      await supertest
        .agent(app.getHttpServer())
        .patch(`/auth/users/${existingRecordId}`)
        .send({
          ...userCreateDtoStub(),
          email: 'bademail.com',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
    });
  });

  const bootstrapBeforeEach = async () => {
    // seed data
    const { id } = await usersService.create({ ...seed() });
    existingRecordId = id;
  };

  const bootstrapAfterEach = async () => {
    await repository.query(`TRUNCATE users CASCADE;`);
  };
});
