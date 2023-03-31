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
    return this.transactionsRepository.find({ where: { ...getTransactionsDto } });
  }

  async find_by_user_with_messages(user_id: number): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: {
        donater_user: true,
        donater_organization: true,
        claimer: true,
        messages: true,
      },
      where: {
        donater_user: {
          id: user_id,
        },
      },
    });
  }

  async find_by_org_with_messages(org_id: number): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: { donater_user: true, donater_organization: true, claimer: true, messages: true },
      where: [
        {
          donater_organization: {
            id: org_id,
          },
        },
        {
          claimer: {
            id: org_id,
          },
        },
      ],
    });
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const found = await this.transactionsRepository.findOneBy({ id });
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
