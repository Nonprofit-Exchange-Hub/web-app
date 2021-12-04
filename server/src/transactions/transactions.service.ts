import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity'
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private transactionsRepository: TransactionsRepository
  ){}

  createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction>{
    return this.transactionsRepository.createTransaction(createTransactionDto)
  }

  getTransactions(filterDto: GetTransactionsFilterDto): Promise<Transaction[]>{
    return this.transactionsRepository.getTransactions(filterDto)
  }

  async getTransactionById(id: string): Promise<Transaction>{
    // NOTE:  findOne is a built in function
    const found = await this.transactionsRepository.findOne(id);
    if (!found){
      throw new NotFoundException();
    }
    return found;
  }
}
