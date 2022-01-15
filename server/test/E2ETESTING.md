# `e2e` Testing the Server

## Goals
- Test all the layers in the server against a realistic test database
- Consume the REST Api routes as the Front End would use it
- No mocking the services: Use the entire app as-bootstrapped, including the services and repositories from the dependency injection module
- Use an actual database instead of an [in-memory database](https://dev.to/webeleon/unit-testing-nestjs-with-typeorm-in-memory-l6m) to get as close as possible to the real deal

## Prerequisites to run the e2e tests
- Existing database based on the test connection options: `test/testing-constants.ts`
- At the moment, you may have to create it manually, but in the future, it should be auto-created for the dev environment

## Important Notes
Use inmutable objects when testing or use a function that returns an new object everytime to avoid mutating it.

If you have to create a new e2e test, see the `test/users/users.controller.e2e-spec.ts` test as guide on how to set up the tests. Especially this line - REFERENCE:

```typescript
describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  let usersService: UsersService;
  let repository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeOrmModule.forRoot(TEST_DB_OPTIONS)],
      controllers: [UsersController],
      providers: [
         // necessary to get the TypeOrm Repository injected
        { provide: getRepositoryToken(User), useClass: Repository }
      ], 
    }).compile();

    app = module.createNestApplication();
    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
    await app.init();
  });
```
