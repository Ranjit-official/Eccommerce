/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { SmtpConfig } from 'src/common/config';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
@Injectable()
export class EmailService {
  #transport: nodemailer.Transporter;
  constructor() {
    dotenv.config();
    try {
      const config = {
        host: SmtpConfig.host,
        port: SmtpConfig.port,
        auth: {
          user: SmtpConfig.user,
          pass: SmtpConfig.password,
        },
        provider: SmtpConfig.provider,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.#transport = nodemailer.createTransport(config);
      console.log('SMTP Connection Successfully.....................');
    } catch (exception) {
      exception.message = 'Failed to connecting to email server';
      throw new Error(exception);
    }
  }

  sendEmail = async ({
    to,
    subject,
    html,
    cc,
    bcc,
    attachments,
  }: {
    to: string;
    subject: string;
    html: string;
    cc?: string;
    bcc?: string;
    attachments?: Express.Multer.File;
  }) => {
    try {
      const msgBody = {
        from: SmtpConfig.from,
        to: to,
        subject: subject,
        html: html,
      };
      if (!to || !subject || !html) {
        throw new Error('Invalid email data');
      }
      if (cc) {
        msgBody['cc'] = cc;
      }
      if (bcc) {
        msgBody['bcc'] = bcc;
      }
      if (attachments) {
        msgBody['attachments'] = attachments;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const response = await this.#transport.sendMail(msgBody);
      return response;
    } catch (exception) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      exception.message = 'Failed to send email';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new Error(exception);
    }
  };
}
