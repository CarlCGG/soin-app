import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  async sendVerificationCode(to: string, code: string) {
    await this.transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: 'SOIN Verification Code',
      text: `Your verification code is: ${code}`,
    });
  }
}