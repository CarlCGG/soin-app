import { Controller, Get, Headers, ForbiddenException } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtService } from '@nestjs/jwt';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private analyticsService: AnalyticsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAnalytics(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });

    const rows = await prisma.$queryRaw`SELECT "isAdmin" FROM "User" WHERE id = ${decoded.sub}`;
    if (!rows[0]?.isAdmin) {
      throw new ForbiddenException('Admin access required');
    }

    return this.analyticsService.getAnalytics(decoded.sub);
  }
}