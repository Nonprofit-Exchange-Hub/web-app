# Resources

## Getting started with our backend
- We use [`NestJs`] as our back-end javascript framework. You can read all about it, but it is simply a high-performace extension of `Express with Node Js` that gives us a lot of tools out of the box.

- As you look at the back end code, you will find that most features are bundled into a folder. This pattern** is common accross the app for a regular `resource`. A resource ussually is our domain (body of work) or a specific feature.

**This example shows the tipical forlder structure that `NestJs` creates when we use the nest cli commands `nest create resource my-resource`
```
server/src/users/
├── dto
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities
│   └── user.entity.ts
├── users.controller.spec.ts
├── users.controller.ts
├── users.module.ts
├── users.service.spec.ts
└── users.service.ts

```
### Demystifying some back-end concepts in our stack
For the most part these follow the [`Onion`] Layer architecture and we make use of them.

#### `___.controller.ts`
responsible for establishing http routes with http verbs, expose "resources" to the internet following a well-established standard called [REST] (Representational state transfer). Our project is set up as a React front-end consuming our Rest api backend. This setup is similar to MVC (model-view-controller), but the back-end is completely independent of the front-end.

#### `___.service`
Generally deals with specific business rules. Also responsible for dealing with database transaction (Create delete edit, etc) and applying other non-http actions that the controller needs. We using a database typescript library called [`Typeorm`]. Typeorm provides us with an API for making database transactions these are all the xxxRepository calls you see in the services.

#### `___.module`
These are `Nest.js`-specific files that help package bundles of code. ***Note:*** these are acutually just Javascript classes and not the same as [`es6 modules or node js modules`]

#### `____.guard.ts`
These are also comparable to middle-ware, they apply some logic that either allows or forbids access to a resource (controller method)

#### `___.spec.ts`
Unit tests, you probably don't have to worry about this for now

#### `___.entity.ts`
Javascript classes that describe a database table. Typeorm reads this file and creates a database table based on what we define there

#### `___.dto.ts`
[`Data Transfer Objects`] - they are used to transfer data between different app layers. These DTOs model the shape of data that interacts with the controller and the data that the service expects. Controllers expose these to validate the data the user or client sends and we also use these to map the data it returns to the client. It tells the client and the developers what data to send with a request and what data to expect on a response.

[`NestJs`]:https://docs.nestjs.com/
[REST]:https://www.redhat.com/en/topics/api/what-is-a-rest-api
[`Onion`]:https://medium.com/expedia-group-tech/onion-architecture-deed8a554423
[`Typeorm`]:https://typeorm.io/
[`es6 modules or node js modules`]:https://blog.logrocket.com/commonjs-vs-es-modules-node-js/#:~:text=ES%20modules%20are%20the%20standard,encapsulating%20JavaScript%20code%20for%20reuse.
[`Data Transfer Objects`]:https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/brownfield/pros-and-cons-of-data-transfer-objects
