import { Controller, Get, Post, Delete, Param, Body, Headers } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtService } from '@nestjs/jwt';

@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAll() {
    return this.eventsService.getAll();
  }

  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.eventsService.create(body, decoded.sub);
  }

  @Post(':id/attend')
  attend(@Param('id') id: string, @Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.eventsService.toggleAttend(parseInt(id), decoded.sub);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventsService.delete(parseInt(id));
  }
}