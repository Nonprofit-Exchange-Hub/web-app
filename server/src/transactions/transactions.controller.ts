import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get()
  getTransactions(@Query() filterDto: GetTransactionsFilterDto): Promise<Transaction[]>{
    return this.transactionsService.getTransactions(filterDto)
  }

  @Get('/:id')
  getTransactionById(@Param('id') id: string): Promise<Transaction>{
    return this.transactionsService.getTransactionById(id)
  }
}
