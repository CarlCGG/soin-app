import { Controller, Get, Post, Delete, Param, Body, Headers, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { JwtService } from '@nestjs/jwt';

@Controller('resources')
export class ResourcesController {
  constructor(
    private resourcesService: ResourcesService,
    private jwtService: JwtService,
  ) {}

  private getUser(auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.jwtService.verify(token, { secret: 'my_secret_key' });
  }

  @Get()
  getAll(@Query('type') type?: string) {
    return this.resourcesService.getAll(type);
  }

  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.resourcesService.create(body, decoded.sub);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.resourcesService.delete(parseInt(id), decoded.sub);
  }
}