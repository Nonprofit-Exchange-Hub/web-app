import { PickType } from '@nestjs/mapped-types';

import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PickType(CreateTransactionDto, ['status'] as const) {}
