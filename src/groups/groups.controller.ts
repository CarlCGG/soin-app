import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtService } from '@nestjs/jwt';

@Controller('groups')
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAllGroups() {
    return this.groupsService.getAllGroups();
  }

  @Get(':id')
  getGroupById(@Param('id') id: string) {
    return this.groupsService.getGroupById(Number(id));
  }

  @Post()
  createGroup(
    @Headers('authorization') auth: string,
    @Body() body: { name: string; description: string; category: string; location: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.createGroup(
      body.name, body.description, body.category, body.location, decoded.sub
    );
  }

  @Post(':id/join')
  joinGroup(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.joinGroup(Number(id), decoded.sub);
  }

  @Get(':id/messages')
  getGroupMessages(@Param('id') id: string) {
    return this.groupsService.getGroupMessages(Number(id));
  }

  @Post(':id/messages')
  sendGroupMessage(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() body: { content: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.sendGroupMessage(Number(id), decoded.sub, body.content);
  }
}