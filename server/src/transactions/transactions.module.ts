import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsRepository } from './transactions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionsRepository])
  ]
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
