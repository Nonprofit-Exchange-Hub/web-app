import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { Repository } from 'typeorm';

import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TEST_DB_OPTIONS } from '../testing-constants';
import { StubGen } from '../stubs/stub-factory';
import { Asset } from '../../src/assets/entities/asset.entity';
import { AssetsModule } from '../../src/assets/assets.module';
import { AssetsController } from '../../src/assets/assets.controller';
import { CreateAssetDto } from '../../src/assets/dto/create-asset.dto';
import { User } from '../../src/users/entities/user.entity';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UsersModule } from '../../src/users/users.module';
import { UsersService } from '../../src/users/users.service';
import { AuthModule } from '../../src/auth/auth.module';
import * as cookieParser from 'cookie-parser';

describe('AssetsController', () => {
  let app: INestApplication;
  let userServ: UsersService;
  let userRepository: Repository<User>;
  let assetRepository: Repository<Asset>;

  const seed: CreateAssetDto = { ...StubGen.createAssetDto() };
  const userSeed: CreateUserDto = { ...StubGen.createUserDto() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AssetsModule, UsersModule, AuthModule, TypeOrmModule.forRoot(TEST_DB_OPTIONS)],
      controllers: [AssetsController],
      providers: [{ provide: getRepositoryToken(Asset), useClass: Repository }],
    }).compile();

    app = module.createNestApplication();
    userServ = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    assetRepository = module.get(getRepositoryToken(Asset));
    app.use(cookieParser('secret_placeholder'));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // seed data
    await userServ.create({ ...userSeed });
  });

  afterEach(async () => {
    await assetRepository.query('DELETE from assets');
    await userRepository.query('DELETE from users');
  });

  it('POST /assets -> when logged in -> asset should be created with logged in user', async () => {
    const loginRes = await supertest
      .agent(app.getHttpServer())
      .post(`/auth/login`)
      .send({ email: userSeed.email, password: userSeed.password })
      .set('Content-Type', 'application/json')
      .expect(201);
    const cookie = loginRes.headers['set-cookie'];
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/assets`)
      .send({ ...seed })
      .set('Content-Type', 'application/json')
      .set('Cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(body.message).toBeUndefined();
  });

  it('POST /assets -> when not logged in-> should return 404', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post(`/assets`)
      .send({ ...seed })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403);
    expect(body.message).toEqual('Forbidden resource');
  });
});
