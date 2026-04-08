import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-code')
  sendCode(@Body() body: { email: string; username: string; password: string }) {
    return this.authService.sendVerificationCode(body.email, body.username, body.password);
  }

  @Post('register')
  register(@Body() body: { email: string; code: string }) {
    return this.authService.register(body.email, body.code);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('send-reset-code')
  sendResetCode(@Body() body: { email: string }) {
    return this.authService.sendResetCode(body.email);
  }

  @Post('reset-password')
  resetPassword(@Body() body: { email: string; code: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.code, body.newPassword);
  }
}