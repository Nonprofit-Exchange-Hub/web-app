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
import { CreateUserDto } from '../../src/acccount-manager/dto/create-user.dto';
import * as cookieParser from 'cookie-parser';
import { AccountManagerService } from '../../src/acccount-manager/account-manager.service';
import { UsersService } from '../../src/acccount-manager/user.service';
import { AcccountManagerModule } from '../../src/acccount-manager/acccount-manager.module';
import { User } from '../../src/acccount-manager/entities/user.entity';

describe('AssetsController', () => {
  let app: INestApplication;
  let userServ: UsersService;
  let accountManagerServ: AccountManagerService;
  let userRepository: Repository<User>;
  let assetRepository: Repository<Asset>;

  const seed: CreateAssetDto = { ...StubGen.createAssetDto() };
  const userSeed: CreateUserDto = { ...StubGen.createUserDto() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AssetsModule, TypeOrmModule.forRoot(TEST_DB_OPTIONS), AcccountManagerModule],
      controllers: [AssetsController],
      providers: [{ provide: getRepositoryToken(Asset), useClass: Repository }],
    }).compile();

    app = module.createNestApplication();
    accountManagerServ = module.get<AccountManagerService>(AccountManagerService);
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
    await assetRepository.query('TRUNCATE assets CASCADE');
    await userRepository.query('TRUNCATE users CASCADE');
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
      .set('Cookie', cookie)
      .set('Content-Type', 'application/json')
      .send({ ...seed })
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
