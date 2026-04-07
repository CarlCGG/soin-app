import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate-post')
  generatePost(@Body() body: { prompt: string }) {
    return this.aiService.generatePost(body.prompt);
  }

 @Post('chat')
  chat(@Body() body: { messages: { role: string; content: string }[]; systemContext?: string }) {
    return this.aiService.chat(body.messages, body.systemContext);
  }

  @Post('suggest-comment')
  suggestComment(@Body() body: { postContent: string }) {
    return this.aiService.suggestComment(body.postContent);
  }
}