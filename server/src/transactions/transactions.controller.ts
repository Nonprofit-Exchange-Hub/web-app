import { Get, Post, Body, Query, Param, Patch, Delete, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ReturnTransactionDto } from './dto/return-transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a transaction.' })
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<ReturnTransactionDto> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch transactions.' })
  get(@Query() getTransactionsDto: GetTransactionsDto): Promise<ReturnTransactionDto[]> {
    return this.transactionsService.getTransactions(getTransactionsDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch a transaction via ID.' })
  getTransactionById(@Param('id') id: number): Promise<ReturnTransactionDto> {
    return this.transactionsService.getTransactionById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a transaction.' })
  update(
    @Param('id') id: number,
    @Body() updateTransactionStatusDto: UpdateTransactionDto,
  ): Promise<ReturnTransactionDto> {
    return this.transactionsService.updateTransaction(id, updateTransactionStatusDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a transaction.' })
  delete(@Param('id') id: number): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
