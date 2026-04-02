import { Controller, Get, Put, Headers } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtService } from '@nestjs/jwt';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationsService: NotificationsService,
    private jwtService: JwtService,
  ) {}

  private getUser(auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.jwtService.verify(token, { secret: 'my_secret_key' });
  }

  @Get()
  getAll(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.notificationsService.getAll(decoded.sub);
  }

  @Get('unread-count')
  getUnreadCount(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.notificationsService.getUnreadCount(decoded.sub);
  }

  @Put('mark-read')
  markAllRead(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.notificationsService.markAllRead(decoded.sub);
  }
}