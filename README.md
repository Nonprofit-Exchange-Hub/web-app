# Nonprofit Circle (working name)

## Description
- Platform for non-profits and citizens to collaborate in a giving economy.
- Primary tech stack: PostgreSQL, NestJs, and React
- Please make sure to read our [contributing/how we work doc](https://github.com/Nonprofit-Exchange-Hub/web-app/blob/main/CONTRIBUTING.md) before getting started

## Installation and Setup

### docker is optional, feel free to skip it if you're not comfortable

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
4. Install required dependencies:
  -  run `npm i` from within `/server` directory and from the `/client` directory.
  - run `npm run prepare` from within `/server` directory and from the `/client` directory.
5. Copy the existing `sample.env` file into a `.env` file in `/server` directory. It will look like this below. Change your secrets accordingly
```
PORT=3001
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_DB=test_db
BCRYPT_WORK_FACTOR=10   
# e2e only used when running e2e tests
E2E_DATABASE_DB=e2e_db
# sockets gateway cors
SOCKET_CORS_ORIGIN="http://localhost:3000"
JWT_SECRET=foobar
# reach out to a team lead for the below value if you need it to work on email notification works
SENDGRID_API_KEY=
```
6. In that `.env` file we'll now customize some of those values
    * If you are using the non-dockerized version of postgres, change the `DATABASE_PORT` value to `5432`
    * check if postgres is installed: `postgres --version`
    * check if postgres service is running: `brew services list | grep postgres` (leave out the piping to see all brew services)
    * commands for service management:
        * start service: `brew services start postgresql`
        * stop service: `brew services stop postgresql`
        * restart service: `brew services restart postgresql`
    * once postgres is running, try `psql`, it will say `Password for user USERNAME`, try some usual passwords
        * if you get in:
            * put that username and password in the env vars
            * run `\list` to list DBs and put one of them in the DATABASE_DB value
        * if you don't get in:
            * we're going to try something like https://stackoverflow.com/questions/15008204/how-to-check-postgres-user-and-password/15008311
            * login to postgres with superuse: `sudo su -`
            * password should be your computer's login password
            * from there, use some sort of combination of the following commands to find or create a user and set the .env var values
```
# list databases:
$ \list
# list users:
$ \du
# create postgres user with postgres password:
$ create user postgres with encrypted password 'postgres';
# add superuser role to postgres user:
$ alter user postgres with superuser;
# add create role role to postgres user:
$ alter user postgres with createrole;
# add create DB role to postgres user:
$ alter user postgres with createdb;
# add replication role to postgres user:
$ alter user postgres with replication;
# add bypass RLS role to postgres user:
$ alter user postgres with bypassrls;
# check password is set and roles are assigned:
$ select * from pg_shadow;
```

    * if you aren't using homebrew, here are some helpful resources and commands
```
# https://www.robinwieruch.de/postgres-sql-macos-setup/

# create postgres database (should only need doing once?)
$ initdb /usr/local/var/postgres
# start server (optionally add/remove `-l logfile` to move log from terminal to a file)
$ pg_ctl -D /usr/local/var/postgres -l logfile start
# stop server
$ pg_ctl -D /usr/local/var/postgres stop
```

## Startup

1. Run `nvm use` to ensure you are using the proper node version
2. If the database is being run for the first time:
    1. from the server directory, `npm run typeorm:migration-run` to add the schema to the database
    2. Next, `npm run db:seed` to create some dev data
2. If using postgres-dockerized workflow, from `/server` directory, run `npm run start:dev:db`
    * Terminal should show a successful start of the docker container, but this can be confirmed by running `docker-compose ps` in terminal to view the docker-compose container name from `docker-compose.yml` file.
3. To start Nest backend in watch mode: From `/server` directory, run `npm run start:dev`
5. To start up React frontend: From `/client` directory, run `npm start`. A browser page should start up automatically. If not, visit `localhost:3000`.

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

## Migrations 
   TypeOrm manages migrations using a migrations table.
   
   ### Bringing you database up to data
   You must do the following to bring your migrations table up to date:

    `npm run typeorm:schema-drop` to clear the current database
    `npm run typeorm:migration-run` to make the database and migration table reflect the existing migrations

    **Whenever you pull main**,
        If there are changes to the migrations folder, navigate to /server and run  `npm run typeorm:migrate` to bring your database up date.
  ### Making database changes
- make sure your database is in sync with main:
    - on the main branch, make sure your database is up to date, run all pending migrations, then run `npm run typeorom:migration-generate`. It should fail, as you have not made any changes to main. If migrations are generated when no changes have been made to main, it means that either a) main is missing a migration. (In this case, reach out on slack) or b) you ran migrations on a feature branch and forgot to revert them.

- checkout the feature branch, run `npm run typeorm:migration-generate` to generate a new migration with your database changes
- add the migration file into the DatabaseConnectionService server/src/database-connection.service.ts
- `npm run typeorm:migration-run` to update your database with the changes

Before moving back to main you must revert the migrations you just made, running `npm run typeorm:migration-revert`. If you made multiple migrations, you must migrate multiple times

### Merging a pull request with database changes
    If any of the database changes in the migration on the pull request conflict with or duplicate other changes made recently, or you just want to be safe, delete the migration in the pull request and re-generate the migration file as described in "making database changes"


### Migration package scripts
"typeorm:migration-run" - runs pending migrations
        "typeorm:migration-generate": generates a migration bringing the current database up to date with your entities
        "typeorm:migration-create": creates an empty migration file
        "typeorm:migration-revert": reverts the last migration you ran
        "typeorm:schema-drop": deletes all tables in the database

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

## Other Resources
### `Server`
See [our compiled resources to get you started](server/docs/RESOURCES.md)

## Support

NEH is an MIT-licensed open source project. If you'd like to join us, please [read more here](https://www.democracylab.org/projects/486).

## License

NEH is [MIT licensed](LICENSE).
