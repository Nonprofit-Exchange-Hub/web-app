const { createConnection } = require('typeorm');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });


// https://typeorm.io/#/transactions/

async function runner() {
  console.log('setting up... \n');

  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  });

  console.log('clearing out old data... \n');
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.query("DELETE FROM users");


  console.log('seeding new dev data... \n');
  await connection.transaction(async transactionalEntityManager => {
    // await transactionalEntityManager.save(users);
    // await transactionalEntityManager.save(photos);
    // ...
  });


  console.log('seeding complete \n');
}

runner();
