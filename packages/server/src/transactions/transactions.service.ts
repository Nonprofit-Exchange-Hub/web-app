import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsRepository.save(createTransactionDto);
  }

  async getTransactions(getTransactionsDto: GetTransactionsDto): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: getTransactionsDto });
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const found = await this.transactionsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateTransaction(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(id);
    const newTransaction = await this.transactionsRepository.save({
      ...transaction,
      ...updateTransactionDto,
    });
    return newTransaction;
  }

  async deleteTransaction(id: number): Promise<void> {
    const transactionToDelete = await this.transactionsRepository.delete(id);
    if (transactionToDelete.affected === 0) {
      throw new NotFoundException();
    }
  }
}
