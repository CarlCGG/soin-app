import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { SmartGoalsService } from './smartgoals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('smartgoals')
@UseGuards(JwtAuthGuard)
export class SmartGoalsController {
  constructor(private readonly smartGoalsService: SmartGoalsService) {}

  @Get()
  getAll(@Req() req: any) {
    return this.smartGoalsService.getAll(req.user.userId);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.smartGoalsService.create(req.user.userId, body);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.smartGoalsService.update(Number(id), req.user.userId, body);
  }

  @Patch(':id/pause')
  togglePause(@Req() req: any, @Param('id') id: string) {
    return this.smartGoalsService.togglePause(Number(id), req.user.userId);
  }

  @Post(':id/checkin')
  checkIn(@Req() req: any, @Param('id') id: string) {
    return this.smartGoalsService.checkIn(Number(id), req.user.userId);
  }

  @Delete(':id')
  delete(@Req() req: any, @Param('id') id: string) {
    return this.smartGoalsService.delete(Number(id), req.user.userId);
  }
}