import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from 'src/database-connection.service';
import { User } from 'src/users/entities/user.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [Logger, SeederService, DatabaseConnectionService],
})
export class SeederModule {}
