import { Controller, Get, Post, Put, Body, Param, Headers, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtService } from '@nestjs/jwt';
import { AiService } from '../ai/ai.service';

@Controller('groups')
export class GroupsController {
  constructor(
  private groupsService: GroupsService,
  private jwtService: JwtService,
  private aiService: AiService,
  ) {}

  @Get('suggested/for-me')
  getSuggestedGroups(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.getSuggestedGroups(decoded.sub);
  }

    @Get('my')
    getMyGroups(@Headers('authorization') auth: string) {
      const token = auth.replace('Bearer ', '');
      const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
      return this.groupsService.getMyGroups(decoded.sub);
    }

    @Get('ai-suggested')
getAISuggestedGroups(@Headers('authorization') auth: string) {
  const token = auth.replace('Bearer ', '');
  const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
  return this.groupsService.getAISuggestedGroups(decoded.sub, this.aiService);
}

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

  @Delete(':id')
  deleteGroup(@Param('id') id: string, @Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.deleteGroup(parseInt(id), decoded.sub);
  }

  @Get(':id/posts')
  getGroupPosts(@Param('id') id: string) {
    return this.groupsService.getGroupPosts(Number(id));
  }

  @Post(':id/posts')
  createGroupPost(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() body: { content: string; imageUrl?: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.createGroupPost(Number(id), decoded.sub, body.content, body.imageUrl);
  }

  @Delete(':id/posts/:postId')
  deleteGroupPost(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Param('postId') postId: string,
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.deleteGroupPost(Number(postId), decoded.sub, Number(id));
  }

  @Get(':id/reviews')
  getGroupReviews(@Param('id') id: string) {
    return this.groupsService.getGroupReviews(Number(id));
  }

  @Post(':id/reviews')
  createGroupReview(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() body: { rating: number; comment?: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.createGroupReview(Number(id), decoded.sub, body.rating, body.comment);
  }

  @Put(':id/description')
  updateDescription(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() body: { description: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.groupsService.updateGroupDescription(Number(id), decoded.sub, body.description);
  }
}