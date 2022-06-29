import { Controller, Post, Query, Request, Response } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { UsersService } from 'src/users/users.service';
import type { Response as ResponseT } from 'express';

@Controller('sendgrid')
export class SendgridController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendgridService: SendgridService,
  ) {}

  @Post('send')
  async sendEmail(
    @Request() req,
    @Response({ passthrough: true }) response: ResponseT,
    @Query('email') email,
  ) {
    try {
      const user = await this.usersService.findByEmail(req.body.email);

      const mail = {
        to: email,
        subject: 'Greeting Message from NestJS Sendgrid',
        from: '<send_grid_email_address>',
        text: 'Hello World from NestJS Sendgrid',
        html: '<h1>Hello World from NestJS Sendgrid</h1>',
      };

      return await this.sendgridService.send(mail);
    } catch (e) {
      response.status(200).send();
    }
  }
}
