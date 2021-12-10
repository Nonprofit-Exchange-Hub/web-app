import { Repository, EntityRepository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';
import { TransactionStatus } from './transaction-status.enum';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {

  async createTransaction(
    createTransactionDto: CreateTransactionDto, user: User,
  ): Promise<Transaction> {
    const {
      donater_user,
      donater_organization,
      recipient,
      asset,
      created_date,
    } = createTransactionDto;
    const transaction = this.create({
      donater_user,
      donater_organization,
      recipient,
      asset,
      status: TransactionStatus.IN_PROGRESS,
      created_date
    });
    await this.save(transaction);
    return transaction;
    
  }

  async getTransactions(
    filterDto: GetTransactionsFilterDto,
  ): Promise<Transaction[]> {
    const {
      status,
      donater_user,
      donater_organization,
      recipient,
      assets,
      created_date,
    } = filterDto;
    const query = this.createQueryBuilder('transaction');

    if (status) {
      query.andWhere('transaction.status = :status', { status });
    }
    if (donater_organization) {
      query.andWhere(
        'transaction.donater_organization_id = :donater_organization_id',
        { donater_organization },
      );
    }
    if (recipient) {
      query.andWhere('transaction.recipient_id = :recipient_id', {
        recipient,
      });
    }
    if (assets) {
      query.andWhere('transaction.asset_id = :asset_id', { assets });
    }
    if (created_date) {
      query.andWhere('transaction.created_date = :created_date', {
        created_date,
      });
    }
    if (donater_user) {
      query.andWhere('transaction.donater_user_id = :donater_user_id', {
        donater_user,
      });
    }

    const transactions = await query.getMany();
    return transactions;
  }

  async deleteTransaction(Transaction): Promise<void> {
    await this.delete(Transaction);
    return Transaction;
  }
}
