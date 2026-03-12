import { Controller, Get, Post, Delete, Body, Param, Headers } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Post()
  createPost(
    @Headers('authorization') auth: string,
    @Body() body: { content: string; imageUrl?: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.postsService.createPost(decoded.sub, body.content, body.imageUrl);
  }

  @Post(':id/like')
  likePost(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.postsService.likePost(Number(id), decoded.sub);
  }

  @Delete(':id')
  deletePost(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.postsService.deletePost(Number(id), decoded.sub);
  }
}