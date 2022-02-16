# `e2e` Testing the Server

## Goals
- Test REST api endpoint layers in the server against a realistic test database. These tests can replace the manual process of testing each endpoint when submitting a new PR.
- Avoid regressions: changing a code in one place should not change the way code behaves somewhere else
- Consume the REST Api routes as the Front End would use it
- No mocking the services: Use the entire app as-bootstrapped, including the services and repositories from the dependency injection module
- Use an actual database instead of an [in-memory database](https://dev.to/webeleon/unit-testing-nestjs-with-typeorm-in-memory-l6m) to get as close as possible to the real deal

## Prerequisites to run the e2e tests
- Existing database based on the test connection options: `server/test/e2e.env`
- At the moment, you may have to create it manually, but in the future, it should be auto-created for the dev environment

## Important Notes
Use immutable objects when testing or use a function that returns an new object everytime to avoid getting a dirty test by mutating a stub. Add stubs in `server/test/stubs`.

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

## Expectation
- Test all API endpoints
- Test edge cases
