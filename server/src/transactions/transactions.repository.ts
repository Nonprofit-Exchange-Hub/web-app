import { Repository, EntityRepository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

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
      status,
      created_date,
    });

    await this.save(transaction);
    return transaction;
  }
}
