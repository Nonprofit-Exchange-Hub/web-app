## `__mocks__`

This folder structure comes from `jest` documentation outlining how to have `jest` mocks auto-initialized and injected into the `NestJS` testing module.


**Note:** `jest` docs mention ***modules***, in the `nodejs` [modules context](https://www.tutorialsteacher.com/nodejs/nodejs-modules#:~:text=Module%20in%20Node.,be%20reused%20throughout%20the%20Node.&text=Each%20module%20in%20Node.,be%20placed%20in%20a%20separate%20.), which refers to how nodejs handles file imports. However, any mention of modules in this README is specifically referring to [NestJS modules](https://docs.nestjs.com/modules), which are comepletely different. 

With `jest`'s auto-mock mechanism, the `__mocks__/users.service.ts` class would get auto initialized and auto mocked in the `users/users.controller.spec.ts` testing module only when placed next to the `users/users.service.ts` file.

```
server  
│
└───users
│   │   users.service.ts
|   |   users.service.spec.ts
|   |   users.controller.ts
│   │   users.controller.spec.ts
│   │
│   └───__mocks__
│       │   users.service.ts // testing stub
```

However we are giving up the auto-mock convenience over having all the service stubs in one place:

```
server
│
└───test
│   │
│   └───__mocks__
│       │   users.service.ts // testing stub
|       |   users.controller.ts // testing stub
│       │   ...
│   
└───users
│   │   users.service.ts
|   |   users.service.spec.ts
|   |   users.controller.ts
│   │   users.controller.spec.ts
```

With this directory structure, we have to manually inject the instance into the NestJS testing module: 

```typescript
describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService = new UsersServiceMock(); // initialize

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }], // inject the instance
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
});
```

