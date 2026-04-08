import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

const verificationCodes = new Map<string, { code: string; expires: number; username: string; password: string }>();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async sendVerificationCode(email: string, username: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('Email already taken');

    const existingUsername = await this.usersService.findByUsername(username);
    if (existingUsername) throw new BadRequestException('Username already taken');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000;
    verificationCodes.set(email, { code, expires, username, password });

    await this.emailService.sendVerificationCode(email, code);
    return { message: 'Verification code sent' };
  }

  async register(email: string, code: string) {
    const record = verificationCodes.get(email);
    if (!record) throw new BadRequestException('No verification code found');
    if (Date.now() > record.expires) {
      verificationCodes.delete(email);
      throw new BadRequestException('Verification code expired');
    }
    if (record.code !== code) throw new BadRequestException('Invalid verification code');

    verificationCodes.delete(email);
    const user = await this.usersService.createUser(email, record.username, record.password);
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, username: user.username, avatar: user.avatar } };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Wrong password');
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, username: user.username, avatar: user.avatar } };
  }

  async sendResetCode(email: string) {
  const user = await this.usersService.findByEmail(email);
  if (!user) throw new BadRequestException('Email not found');

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 10 * 60 * 1000;
  verificationCodes.set(`reset_${email}`, { code, expires, username: '', password: '' });

  await this.emailService.sendVerificationCode(email, code);
    return { message: 'Reset code sent' };
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const record = verificationCodes.get(`reset_${email}`);
    if (!record) throw new BadRequestException('No reset code found');
    if (Date.now() > record.expires) {
      verificationCodes.delete(`reset_${email}`);
      throw new BadRequestException('Reset code expired');
    }
    if (record.code !== code) throw new BadRequestException('Invalid reset code');

    verificationCodes.delete(`reset_${email}`);
    const bcrypt = require('bcrypt');
    const hashed = await bcrypt.hash(newPassword, 10);
    const user = await this.usersService.findByEmail(email);
    await this.usersService.updateProfile(user!.id, { password: hashed } as any);
    return { message: 'Password reset successful' };
  }
}