import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get()
  getTransactions(
    @Query()
    filterDto: GetTransactionsFilterDto,
  ): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(filterDto);
  }

  @Get('/:id')
  getTransactionById(@Param('id') id: number): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @Patch('/:id/status')
  updateTransaction(
    @Param('id') id: number,
    @Body() updateTransactionStatusDto: UpdateTransactionStatusDto,
  ): Promise<Transaction> {
    const { status } = updateTransactionStatusDto;
    return this.transactionsService.updateTransaction(id, status);
  }

  @Delete('/:id')
  deleteTransaction(@Param('id') id: number): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
