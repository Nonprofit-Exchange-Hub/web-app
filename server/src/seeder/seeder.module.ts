import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from 'src/database-connection.service';
import { UsersModule } from 'src/users/users.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    UsersModule,
  ],
  providers: [Logger, SeederService, DatabaseConnectionService],
})
export class SeederModule {}
