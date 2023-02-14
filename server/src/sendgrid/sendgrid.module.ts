import { Module } from '@nestjs/common';

import { SendgridService } from './sendgrid.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
