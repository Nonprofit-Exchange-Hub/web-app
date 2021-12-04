import { Repository, EntityRepository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';
import { transcode } from 'buffer';
import { TransactionStatus } from './transaction-status.enum';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const {
      donater_user_id,
      donater_organization_id,
      requester_id,
      asset_id,
      status,
      created_date,
    } = createTransactionDto;
    // NOTE:  create needs 2 methods from tasksRepo
    const transaction = this.create({
      donater_user_id,
      donater_organization_id,
      requester_id,
      asset_id,
      status: TransactionStatus.IN_PROGRESS,
      created_date,
    });

    await this.save(transaction);
    return transaction;
  }

  async getTransactions(filterDto: GetTransactionsFilterDto): Promise<Transaction[]>{
    const query = this.createQueryBuilder('transaction');
    const transactions = await query.getMany();
    return transactions;
  }

  async deleteTransaction(Transaction): Promise<void>{
    await this.delete(Transaction);
    return Transaction
  }
}
