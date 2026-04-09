import { Injectable } from '@nestjs/common';
import { AIProvider } from './ai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { OpenAIProvider } from './providers/openai.provider';

@Injectable()
export class AIFactoryService {
  private provider: AIProvider;

  constructor() {
    this.provider = this.createProvider(process.env.AI_PROVIDER || 'gemini');
  }

  private createProvider(name: string): AIProvider {
    switch (name.toLowerCase()) {
      case 'openai':
        return new OpenAIProvider(process.env.OPENAI_API_KEY || '');
      case 'gemini':
      default:
        return new GeminiProvider(process.env.GEMINI_API_KEY || '');
    }
  }

  getProvider(): AIProvider {
    return this.provider;
  }

  switchProvider(name: string): void {
    this.provider = this.createProvider(name);
  }
}