import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as supertest from 'supertest';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

import { userCreateDtoStub } from '../stubs';
import { User } from '../../src/acccount-manager/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TEST_DB_OPTIONS } from '../testing-constants';
import { SendgridModule } from '../../src/sendgrid/sendgrid.module';
import { UsersService } from '../../src/acccount-manager/user.service';
import { AcccountManagerModule } from '../../src/acccount-manager/acccount-manager.module';
import { AccountManagerController } from '../../src/acccount-manager/account-manager.controller';
import { SendgridService } from '../../src/sendgrid/sendgrid.service';
import { FileStorageModule } from '../../src/file-storage/file-storage.module';

describe('AccountManagerController', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let repository: Repository<User>;

  let existingRecordId = 0;
  const seed = () => ({
    firstName: 'peter',
    last_name: 'parker',
    email: 'peter.parker@example.com',
    bio: 'I am Spiderman',
    city: 'New York City',
    state: 'New York',
    zip_code: '10001',
    password: 'secret1234',
    email_verified: true,
    email_notification_opt_out: false,
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AcccountManagerModule,
        TypeOrmModule.forRoot(TEST_DB_OPTIONS),
        SendgridModule,
        JwtModule.register({
          secret: '',
          signOptions: { expiresIn: '60s' },
        }),
        FileStorageModule,
      ],
      controllers: [AccountManagerController],
      providers: [{ provide: getRepositoryToken(User), useClass: Repository }],
    })
      .overrideProvider(SendgridService)
      .useValue({ send: () => true })
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
    usersService = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
    // jest.clearAllMocks();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/signup', () => {
    beforeEach(async () => await bootstrapBeforeEach());
    afterEach(async () => await bootstrapAfterEach());

    it('should create and return created user', async () => {
      const userToCreate = userCreateDtoStub();
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/auth/signup`)
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

    it('should return 400 when email validations fails', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/auth/signup`)
        .send({
          ...userCreateDtoStub(),
          email: 'bademail.com',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return 400 when email is null', async () => {
      await supertest
        .agent(app.getHttpServer())
        .post(`/auth/signup`)
        .send({
          ...userCreateDtoStub(),
          email: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return 409 with message when email already exists', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/auth/signup`)
        .send({
          firstName: 'peter',
          last_name: 'parker',
          email: 'peter.parker@example.com',
          password: 'secret1234',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409);
      expect(body.message).toEqual('Email already exists');
    });
  });

  describe('Get /auth/users/{id}', () => {
    beforeEach(async () => await bootstrapBeforeEach());
    afterEach(async () => await bootstrapAfterEach());

    it.skip('should return 200 with existing record', async () => {
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

    it.skip('should not return password hash', async () => {
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
