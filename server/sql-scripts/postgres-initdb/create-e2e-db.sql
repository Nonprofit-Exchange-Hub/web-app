SELECT
  'CREATE DATABASE e2e_db' -- change the db name here
WHERE
  NOT EXISTS (
    SELECT
    FROM
      pg_database
    WHERE
      datname = 'e2e_db') \gexec -- change the db name here

