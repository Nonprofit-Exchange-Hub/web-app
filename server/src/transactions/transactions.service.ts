import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';
import { TransactionStatus } from './transaction-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsRepository.save(createTransactionDto);
  }

  // look at this filter
  getTransactions(filterDto: GetTransactionsFilterDto): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  async getTransactionById(id: number): Promise<Transaction> {
    // NOTE:  findOne is a built in function
    const found = await this.transactionsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateTransaction(id: number, status: TransactionStatus): Promise<Transaction> {
    const transaction = await this.getTransactionById(id);
    transaction.status = status;
    await this.transactionsRepository.save(transaction);
    return transaction;
  }

  async deleteTransaction(id: number): Promise<void> {
    const transactionToDelete = await this.transactionsRepository.delete(id);
    // NOTE:  affected method discoverable via console.log
    if (transactionToDelete.affected === 0) {
      throw new NotFoundException();
    }
  }
}
