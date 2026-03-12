import { Controller, Get, Post, Delete, Body, Param, Headers } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtService } from '@nestjs/jwt';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private jwtService: JwtService,
  ) {}

  @Get(':postId')
  getComments(@Param('postId') postId: string) {
    return this.commentsService.getComments(Number(postId));
  }

  @Post()
  createComment(
    @Headers('authorization') auth: string,
    @Body() body: { postId: number; content: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.commentsService.createComment(body.postId, decoded.sub, body.content);
  }

  @Delete(':id')
  deleteComment(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.commentsService.deleteComment(Number(id), decoded.sub);
  }
}