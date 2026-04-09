import { Injectable } from '@nestjs/common';
import { AIFactoryService } from './ai-factory.service';

@Injectable()
export class AiService {
  constructor(private aiFactory: AIFactoryService) {}

  async generatePost(prompt: string) {
    const provider = this.aiFactory.getProvider();
    const content = await provider.generateText(
      `You are a social media post writer. Write a concise and engaging social media post in English, under 100 words. Topic: ${prompt}`
    );
    return { content };
  }

  async chat(messages: { role: string; content: string }[], systemContext?: string) {
    const provider = this.aiFactory.getProvider();
    const systemPrompt = (systemContext || 'You are a helpful AI assistant for SOIN social platform.') +
      ' Always respond in English. Keep responses concise and under 80 words.';
    const content = await provider.chat(messages, systemPrompt);
    return { content };
  }

  async suggestComment(postContent: string) {
    const provider = this.aiFactory.getProvider();
    const content = await provider.generateText(
      `Based on the following post, suggest 3 interesting comments in English, each under 20 words. Use numbered list format:\n\n${postContent}`
    );
    return { content };
  }

  async moderateContent(text: string): Promise<{ safe: boolean; reason?: string }> {
    const provider = this.aiFactory.getProvider();
    const result = await provider.generateText(
      `You are a content moderator. Analyze the following text and respond ONLY with JSON format: {"safe": true/false, "reason": "explanation if unsafe"}\n\nText: ${text}`
    );
    try {
      return JSON.parse(result);
    } catch {
      return { safe: true };
    }
  }

  async suggestGroups(userTags: string, recentMessages: string): Promise<string[]> {
    const provider = this.aiFactory.getProvider();
    const result = await provider.generateText(
      `Based on user interests: ${userTags} and recent conversations: ${recentMessages}, suggest 3 group names they should join or create. Respond ONLY with JSON array of strings. Example: ["Football Lovers", "Tech Enthusiasts", "Book Club"]`
    );
    try {
      return JSON.parse(result);
    } catch {
      return [];
    }
  }
}