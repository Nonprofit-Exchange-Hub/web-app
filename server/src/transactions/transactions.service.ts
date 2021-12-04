import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private transactionsRepository: TransactionsRepository
  ){}

  createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction>{
    return this.transactionsRepository.createTransaction(createTransactionDto)
  }
}
