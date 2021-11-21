# Nonprofit Exchange Hub (working name)

## Description 
Platform for non-profits and citizens to collaborate in a giving economy.

Primary tech stack: PostgreSQL, Nest, and React

## Installation and Setup

1. Setup PostgreSQL Database and OPTIONALLY wrap in Docker container
    * Install postgres if you do not have it already https://www.postgresql.org/download/
        * Make a note of your username and password
    * note: you can skip the below dockerize step if you want to run postgres locally
    * Docker Installation - Follow instuctions for your specific platform:
        * [Docker](https://docs.docker.com/get-docker/)
        * Confirm installation of Docker (version and build may differ)
        ```
        $ docker -v
        Docker version 1.7.0, build 0baf609
        ```
        * [Docker Compose](https://docs.docker.com/compose/install/)
        * Confirm installation of Docker Compose (version and build may differ)
        ```
        $ docker-compose --version
        docker-compose version 1.29.2, build 1110ad01
        ```
2. Download or [clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) repository.
3. Run `nvm use` to ensure you are using the proper node version
4. Install required dependencies by running `npm install` from within `/server` directory and from the `/client` directory.
5. Copy the below environmental variables into a `.env` file that you create in `/server` directory
```
    PORT=3001
    DATABASE_HOST=localhost
    DATABASE_PORT=8080
    DATABASE_USER=postgres
    DATABASE_PASSWORD=your_password
    DATABASE_DB=test_db
    BCRYPT_WORK_FACTOR=10   
```
6. In that `.env` file we'll now customize some of those values
    * If you are using the non-dockerized version of postgres, change the `DATABASE_PORT` value to `5432`

TODO add helpful commands for:
finding postgres user
finding postgres db name
changing postgres user's password via sudo or su (superuser)


## Startup

1. Run `nvm use` to ensure you are using the proper node version
2. If using postgres-dockerized workflow, from `/server` directory, run `npm run start:dev:db`
    * Terminal should show a successful start of the docker container, but this can be confirmed by running `docker ps` in terminal to view all running containers. One should match the name of `container_name` from `docker-compose.yml` file
3. To start Nest backend in watch mode: From `/server` directory, run `npm run start:dev`.
4. To start up React frontend: From `/client` directory, run `npm start`. A browser page should start up automatically. If not, visit `localhost:3000`.

## Test
Most tests are still in development.
### Backend
From the `/server` directory.
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### Frontend
From the `/client` directory.
```bash
# unit tests
$ npm run test
```

## Support

NEH is an MIT-licensed open source project. If you'd like to join us, please [read more here](https://www.democracylab.org/projects/486).

## License

NEH is [MIT licensed](LICENSE).

