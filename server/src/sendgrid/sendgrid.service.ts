import { Injectable, Logger } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    Logger.log(`E-Mail sent to ${mail.to}`, SendgridService.name);
    return transport;
  }
}
