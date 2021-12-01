import { Repository, EntityRepository } from "typeorm";
import { Transaction } from "./transaction.entity"
import { CreateTransactionkDto } from "./dto/create-transaction.dto";

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction>{

}