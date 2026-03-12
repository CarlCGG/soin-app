import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtService } from '@nestjs/jwt';

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private jwtService: JwtService,
  ) {}

  @Get('conversations')
  getConversationList(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.messagesService.getConversationList(decoded.sub);
  }

  @Get('users')
  getAllUsers(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.messagesService.getAllUsers(decoded.sub);
  }

  @Get(':userId')
  getConversation(
    @Headers('authorization') auth: string,
    @Param('userId') userId: string,
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.messagesService.getConversation(decoded.sub, Number(userId));
  }

  @Post()
  sendMessage(
    @Headers('authorization') auth: string,
    @Body() body: { receiverId: number; content: string },
  ) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
    return this.messagesService.sendMessage(decoded.sub, body.receiverId, body.content);
  }
}