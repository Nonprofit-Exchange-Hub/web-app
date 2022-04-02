import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CookieAuthGuard } from '../auth/guards/cookie-auth.guard';
import { UsersService } from '../users/users.service';

import type { AuthedRequest } from '../types';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionsService: TransactionsService,
    private usersService: UsersService,
  ) {}

  // @UseGuards(CookieAuthGuard)
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @UseGuards(CookieAuthGuard)
  @Get()
  async get(@Query() getTransactionsDto: GetTransactionsDto): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(getTransactionsDto);
  }

  @UseGuards(CookieAuthGuard)
  @Get('/currentUser')
  async getCurrentUsersTransactions(@Request() req: AuthedRequest): Promise<Transaction[]> {
    const user = await this.usersService.findOne(req.user.id);

    return this.transactionsService.getCurrentUsersTransactions(user);
  }

  @UseGuards(CookieAuthGuard)
  @Get('/:id')
  async getTransactionById(@Param('id') id: number): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @UseGuards(CookieAuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateTransactionStatusDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.updateTransaction(id, updateTransactionStatusDto);
  }

  @UseGuards(CookieAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
