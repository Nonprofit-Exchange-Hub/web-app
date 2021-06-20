# Nonprofit Exchange Hub (working name)

## Description 
Platform for non-profits and citizens to collaborate in a giving economy.

Primary tech stack: PostgreSQL, Nest, and React

## Installation and Setup

1. Setup PostgreSQL Database locally or via a Docker container
    * [Local Installation](https://www.postgresql.org/download/)
    * Docker Installation - Follow instuctions for your specific platform:
        * [Docker](https://docs.docker.com/get-docker/)
        * [Docker Compose](https://docs.docker.com/compose/install/)
2. Download or [clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) repository.
4. Install required dependencies by running `npm install` from within `/server` directory and from the `/client` directory.
3. Environmental variables required in `/server` directory - defaults provided can be changed out at will:

```
    PORT=3001
    DATABASE_HOST=localhost
    DATABASE_PORT=8080
    DATABASE_USER=postgres
    DATABASE_PASSWORD=your_password
    DATABASE_DB=test_db
```

## Startup

1. If going the docker route for PostgreSQL, and docker and docker-compose are installed, ensure the specified `DATABASE_PORT` is free and run `npm run start:dev:db` from `/server` directory to start up PostgreSQL docker container.
    * Terminal should show a successful start of the docker container, but this can be confirmed by running `docker ps` in terminal to view all running containers. One should match the name of `container_name` from `docker-compose.yml` file
    * Otherwise make sure PostgreSQL is running locally.
2. To start Nest backend in watch mode: From `/server` directory, run `npm run start:dev`.
3. To start up React frontend: From `/client` directory, run `npm start`. A browser page should start up automatically. If not, visit `localhost:3000`.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

NEH is an MIT-licensed open source project. If you'd like to join us, please [read more here](https://www.democracylab.org/projects/486).

## License

NEH is [MIT licensed](LICENSE).

