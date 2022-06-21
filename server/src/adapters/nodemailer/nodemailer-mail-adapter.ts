import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'cd201fc5bc15eb',
    pass: 'd1a450cfa17cc4',
  },
});

//This implements assignments from MailAdapter, which is sendMail function, that expects a subject and a body as params
export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    // Send e-mail to page owner containing feedback info
    await transport.sendMail({
      from: 'Feedget Team <feedget@team.com>',
      to: 'Vitor Rafael <rqfvitor@gmail.com>',
      subject,
      html: body,
    });
  }
}
