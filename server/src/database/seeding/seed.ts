import { INestApplicationContext, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from 'src/seeder/seeder.module';
import { SeederService } from 'src/seeder/seeder.service';

const bootstrapSeed = async (): Promise<void> => {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext: INestApplicationContext) => {
      const logger: Logger = appContext.get(Logger);
      const seeder: SeederService = appContext.get(SeederService);

      seeder
        .seedAsync()
        .then(() => {
          logger.log('Seeding complete');
        })
        .catch((error: any) => {
          logger.error('Seeding Failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error: any) => {
      throw error;
    });
};

bootstrapSeed();
