import { Test, TestingModule } from '@nestjs/testing';
import { userCreateDtoStub } from '../stubs';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { User } from '../../src/users/entities/user.entity';
import { UsersModule } from '../../src/users/users.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TEST_DB_OPTIONS } from '../testing-constants';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let repository: Repository<User>;

  let existingRecordId = 0;
  const seed = {
    first: 'peter',
    last: 'parker',
    email: 'peter.parker@example.com',
    pass: 'secret1234',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeOrmModule.forRoot(TEST_DB_OPTIONS)],
      controllers: [UsersController],
      providers: [{ provide: getRepositoryToken(User), useClass: Repository }],
    }).compile();

    app = module.createNestApplication();
    usersService = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
    // jest.clearAllMocks();
    await app.init();
  });

  beforeEach(async () => {
    // seed data
    const { id } = await usersService.create({
      first_name: seed.first,
      last_name: seed.last,
      email: seed.email,
      password: seed.pass,
    });
    existingRecordId = id;
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM users;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users', () => {
    it('should create and return created user', async () => {
      const userToCreate = userCreateDtoStub();
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/users`)
        .send(userCreateDtoStub())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      expect(body.id).not.toBeNull();
      expect(body.email).toEqual(userToCreate.email);
      expect(body.first_name).toEqual(userToCreate.first_name);
      expect(body.last_name).toEqual(userToCreate.last_name);
      expect(body.password).toBeUndefined();
    });

    // not yet implemented, so skipping for now
    it.skip('should return 403 when email validations fails', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/users`)
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
        .post(`/users`)
        .send({ ...seed })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409);
      expect(body.message).toEqual('Email already exists');
    });
  });

  describe('Get /users/{id}', () => {
    it('should return 200 with existing record', async () => {
      // assert
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/users/${existingRecordId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body).not.toBeUndefined();
      expect(body.id).not.toBeNull();
      expect(body.email).toEqual(seed.email);
      expect(body.first_name).toEqual(seed.first);
      expect(body.last_name).toEqual(seed.last);
    });

    // not yet implemented, so skipping for now
    it.skip('should not return password hash', async () => {
      // assert
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get(`/users/${existingRecordId}`)
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
        .get(`/users/10000`)
        .set('Accept', 'application/json')
        .expect(404);
    });
  });

  describe('PATCH users/{id}', () => {
    it.skip('should return 403 when email validations fails', async () => {
      await supertest
        .agent(app.getHttpServer())
        .patch(`/users/${existingRecordId}`)
        .send({
          ...userCreateDtoStub(),
          email: 'bademail.com',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
    });
  });
});
