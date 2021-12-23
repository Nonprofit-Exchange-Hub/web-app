/**
 * checks if the db exists, if it doesn't it creates it.
 * this runs when the docker container starts.
 * see the volumes in the docker-compose files
 */
SELECT
  'CREATE DATABASE test_db' -- change the db name here
WHERE
  NOT EXISTS (
    SELECT
    FROM
      pg_database
    WHERE
      datname = 'test_db') \gexec -- change the db name here

