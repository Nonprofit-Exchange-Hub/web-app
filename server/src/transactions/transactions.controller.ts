import { Controller, Post, Body, Get, Query, Param, Delete, Patch } from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get()
  get(
    @Query()
    filterDto: GetTransactionsDto,
  ): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(filterDto);
  }

  @Get('/:id')
  getTransactionById(@Param('id') id: number): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() updateTransactionStatusDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.updateTransaction(id, updateTransactionStatusDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
