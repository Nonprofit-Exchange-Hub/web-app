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
        * Confirm installation of Docker: `$ docker -v`
        * [Docker Compose](https://docs.docker.com/compose/install/)
        * Confirm installation of Docker Compose: `$ docker-compose --version`
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

## Postgres & Docker
### Running Postgres Test Database from the Docker CLI
1. Open and run the Docker desktop app
2. Start database: `$ npm run start:dev:db `
3. Start server: `$ npm run start:dev`
4. From a new terminal window:
```
# get a bash shell in the "postgres" docker container:
$ docker exec -it postgres /bin/bash

# login to your database:
$ su - postgres

# enter the PostgreSQL environment:
$ psql

# connect to the test_db database:
$ \c test_db

# From here you should be able to see all of the tables in the test_db with:
$ \dt

#You can now run SQL commands and queries here
```

### Access psql inside a docker container in a single line: 
`$ docker exec -it <container-id> psql -U <username> -d <database-name>`

source: [StackOverflow](https://stackoverflow.com/questions/53974488/how-to-delete-and-recreate-a-postgres-database-using-a-single-docker-command)

### Useful Postgres Commands
Log into your local postgres server:
```
# format is: su - <postgres role name>
# so something like...
$ su - postgres
```

Enter into psql command prompt within the postgresql server
`$ psql`

List Roles
`$ \du`

Connect to a specific database 
`$ \c <db_name>`

List all tables within a database after connecting to it
`$ \dt`


### Other helpful Postgres/Docker Resources:
- [Altering Roles within psql](https://www.postgresql.org/docs/9.1/sql-alterrole.html)
- [Listing and Switching Databases for psql](https://www.liquidweb.com/kb/listing-switching-databases-postgresql/)
- [Drop Tables psql](https://www.geeksforgeeks.org/postgresql-drop-table/#:~:text=PostgreSQL%20has%20a%20DROP%20TABLE,table%20permanently%20from%20the%20database)
- [SSH into Docker Container](https://phase2.github.io/devtools/common-tasks/ssh-into-a-container/)

## Support

NEH is an MIT-licensed open source project. If you'd like to join us, please [read more here](https://www.democracylab.org/projects/486).

## License

NEH is [MIT licensed](LICENSE).

