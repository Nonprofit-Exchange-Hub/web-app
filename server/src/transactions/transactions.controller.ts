import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { CookieAuthGuard } from 'src/acccount-manager/guards/cookie-auth.guard';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get()
  get(@Query() getTransactionsDto: GetTransactionsDto): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(getTransactionsDto);
  }

  @UseGuards(CookieAuthGuard)
  @Get('/inbox')
  // returns trasnactions with latest messages
  async userInbox(@Request() req: Request): Promise<Transaction[]> {
    const user = req['user'];
    const userOrgs = await user.organizations;
    const org_id = userOrgs && userOrgs.length > 0 ? userOrgs[0].organizationId : false;
    if (org_id) {
      return this.transactionsService.find_by_org_with_latest_message(org_id);
    } else {
      return this.transactionsService.find_by_user_with_latest_message(user.id);
    }
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
