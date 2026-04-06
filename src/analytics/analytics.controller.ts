import { Controller, Get, Headers } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtService } from '@nestjs/jwt';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private analyticsService: AnalyticsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAnalytics(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.analyticsService.getAnalytics(decoded.sub);
  }
}