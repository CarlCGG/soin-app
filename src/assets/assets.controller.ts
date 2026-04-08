import { Controller, Get, Post, Delete, Param, Body, Headers, Query, Put } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { JwtService } from '@nestjs/jwt';

@Controller('assets')
export class AssetsController {
  constructor(
    private assetsService: AssetsService,
    private jwtService: JwtService,
  ) {}

  private getUser(auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.jwtService.verify(token, { secret: 'my_secret_key' });
  }

  @Get()
  getAll(@Query('type') type?: string) {
    return this.assetsService.getAll(type);
  }

  @Get('my')
  getMy(@Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.assetsService.getMy(decoded.sub);
  }

  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.assetsService.create(body, decoded.sub);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Headers('authorization') auth: string) {
    const decoded = this.getUser(auth);
    return this.assetsService.delete(parseInt(id), decoded.sub);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: any) {
    // 注意：Prisma 通常需要 number 类型的 ID
    return this.assetsService.update(Number(id), updateData);
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.assetsService.cancel(Number(id));
  }
}