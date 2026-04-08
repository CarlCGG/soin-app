import { Controller, Get, Post, Delete, Param, Body, Headers, UseGuards, Req } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { JwtService } from '@nestjs/jwt';

@Controller('businesses')
export class BusinessesController {
  constructor(
    private businessesService: BusinessesService,
    private jwtService: JwtService,
  ) {}

  private getUser(auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.jwtService.verify(token, { secret: 'my_secret_key' });
  }

  @Get()
  getAll() {
    return this.businessesService.getAll();
  }

  @Get('my')
  getMyBusinesses(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.businessesService.getMyBusinesses(decoded.sub);
  }

  @Get('connections')
  getConnectionsBusinesses(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.businessesService.getConnectionsBusinesses(decoded.sub);
  }

  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.businessesService.create(body, decoded.sub);
  }

  @Post(':id/follow')
  follow(@Param('id') id: string, @Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.businessesService.toggleFollow(parseInt(id), decoded.sub);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.businessesService.delete(parseInt(id), decoded.sub);
  }
}