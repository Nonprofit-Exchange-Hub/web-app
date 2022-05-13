# STAGING BUILD WIKI

## Building the app

This document describes how to build the entire app in a simulated local production environment (staging) using docker-compose.

[Prerequisite Software](#prerequisite-software)

### Prerquisite Software

- [free version of docker desktop](https://www.docker.com/get-started)

## Build

- stop any other docker containers running on port `5433` (very unlikely). [How to list and stop containers](https://phoenixnap.com/kb/how-to-list-start-stop-docker-containers)

- cd to `server`

- in the `.env` file, change the host to `db` (the docker-compose service name) and make sure the port is set to `5432`:

```.env
# if you change DATABASE_DB here, also change db name in init.sql
PORT=3001
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_DB=staging_db
BCRYPT_WORK_FACTOR=10
```

- Make sure your `.env` `DATABASE_DB` value matches those in `sql-scripts/postgres-initdb/create-db.sql`.

- Run from `server`

```sh
sudo docker-compose -f docker-compose.staging.yml up -d --build
```

- To stop, from `server` run

```sh
sudo docker-compose -f docker-compose.staging.yml down
```

- To see the server's log, run the command below. `ctr + c` to exit

```sh
docker-compose -f docker-compose.staging.yml logs -f api
```

- Front end should be served from `http://localhost:3001`. The API endpoint are also accessible from `http://localhost:3001`

### How it works

The `docker-compose.staging.yml` file is setup to run a postgres container that automatically creates the database on first start based on the sql scripts in the `docker-entrypoint-initdb.d/init.sql` directory (inside container). It runs on another database than the development one. The docker-build database runs on `5433` on the host and `5432` in the container.

Notice the volume

```yml
db: # compose service name
  container_name: postgres
  image: postgres:latest
  ports:
    - 5433:5432 # host:container
  environment:
    POSTGRES_USER: ${DATABASE_USER}
    POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
    POSTGRES_DB: ${DATABASE_DB}
  volumes:
    - ./pgdata-staging:/var/lib/postgresql/data
    - ./sql-scripts/postgres-initdb/create-db.sql:/docker-entrypoint-initdb.d/init.sql # runs slq script on startup
```

**Dockerfile**: Builds the client and the server with productions configurations and containerizes the process `npm run start:prod`.

Other details:

- The Create React App client is built into static files, which are then served by the `NestJS` server as static files. See configuration at `src/app.module.ts`
