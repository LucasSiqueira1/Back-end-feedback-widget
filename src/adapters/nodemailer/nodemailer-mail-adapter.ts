import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
      user: "7aa6ce92cb04ca",
      pass: "ee687bb42bb22d"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Lucas Eduardo <lucaraz133@gmail.com>',
      subject: data.subject,
      html: data.body
    })
  }
}