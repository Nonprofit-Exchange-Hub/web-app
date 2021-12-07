import { Repository, EntityRepository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';
import { TransactionStatus } from './transaction-status.enum';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {

  async createTransaction(
    createTransactionDto: CreateTransactionDto, user: User
  ): Promise<Transaction> {
    const {
      donater_user_id,
      donater_organization_id,
      requester_id,
      asset_id,
      created_date,
    } = createTransactionDto;
    // NOTE:  create needs 2 methods from Repository, create & save
    const transaction = this.create({
      donater_user_id,
      donater_organization_id,
      requester_id,
      asset_id,
      status: TransactionStatus.IN_PROGRESS,
      created_date,
      user
    });
    await this.save(transaction);
    return transaction;
  }

  async getTransactions(
    filterDto: GetTransactionsFilterDto,
  ): Promise<Transaction[]> {
    const {
      status,
      donater_user_id,
      donater_organization_id,
      requester_id,
      asset_id,
      created_date,
    } = filterDto;
    const query = this.createQueryBuilder('transaction');

    if (status) {
      query.andWhere('transaction.status = :status', { status });
    }
    if (donater_organization_id) {
      query.andWhere(
        'transaction.donater_organization_id = :donater_organization_id',
        { donater_organization_id },
      );
    }
    if (requester_id) {
      query.andWhere('transaction.requester_id = :requester_id', {
        requester_id,
      });
    }
    if (asset_id) {
      query.andWhere('transaction.asset_id = :asset_id', { asset_id });
    }
    if (created_date) {
      query.andWhere('transaction.created_date = :created_date', {
        created_date,
      });
    }
    if (donater_user_id) {
      query.andWhere('transaction.donater_user_id = :donater_user_id', {
        donater_user_id,
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
    // search method
    // if (search){
    //   query.andWhere(
    //     'transaction.donater_user_id == :search',
    //     { search: `${search}`}
    //   )
    // }