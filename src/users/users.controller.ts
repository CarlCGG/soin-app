import { Controller, Get, Put, Body, Headers, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('profile')
  getProfile(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.usersService.getProfile(decoded.sub);
  }

  @Put('profile')
  updateProfile(@Headers('authorization') auth: string, @Body() body: any) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.usersService.updateProfile(decoded.sub, body);
  }

  @Put('change-password')
  changePassword(@Headers('authorization') auth: string, @Body() body: { currentPassword: string; newPassword: string }) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.usersService.changePassword(decoded.sub, body.currentPassword, body.newPassword);
  }

  @Get('similar')
  getSimilarUsers(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.usersService.getSimilarUsers(decoded.sub);
  }

  @Get('profile/:id')
  getUserProfile(@Param('id') id: string) {
    return this.usersService.getProfile(Number(id));
  }
}