import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

@Injectable()
export class SendgridService {
  constructor() {
    SendGrid.setApiKey(SENDGRID_API_KEY);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
