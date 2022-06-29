import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridService } from './sendgrid.service';
import { SendgridController } from './sendgrid.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SendgridController],
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
