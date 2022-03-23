import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../../seeder/seeder.module';
/**
 * This method is run as an npm script in `package.json` and
 * is a separate process as the main app
 */
const bootstrapSeed = async (): Promise<void> => {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext: INestApplicationContext) => {
      /*
        init() will call the lifecycle events for SeederModule.
        See SeederModule
       */
      appContext.init();
      appContext.close();
    })
    .catch((error: any) => {
      throw error;
    });
};

bootstrapSeed();
