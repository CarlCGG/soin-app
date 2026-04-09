import { Injectable } from '@nestjs/common';
import { AIProvider } from './ai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { DeepSeekProvider } from './providers/deepseek.provider';

@Injectable()
export class AIFactoryService {
  private providers: AIProvider[];
  private currentIndex: number = 0;

  constructor() {
    this.providers = [];
    // 按优先级添加可用的 provider
    if (process.env.GEMINI_API_KEY) {
      this.providers.push(new GeminiProvider(process.env.GEMINI_API_KEY));
    }
    if (process.env.DEEPSEEK_API_KEY) {
      this.providers.push(new DeepSeekProvider(process.env.DEEPSEEK_API_KEY));
    }
    if (process.env.OPENAI_API_KEY) {
      this.providers.push(new OpenAIProvider(process.env.OPENAI_API_KEY));
    }
  }

  getProvider(): AIProvider {
    return this.providers[this.currentIndex];
  }

  // 自动切换到下一个可用的 provider
  async executeWithFallback(fn: (provider: AIProvider) => Promise<string>): Promise<string> {
    for (let i = 0; i < this.providers.length; i++) {
      const index = (this.currentIndex + i) % this.providers.length;
      try {
        const result = await fn(this.providers[index]);
        this.currentIndex = index; // 成功后记住这个 provider
        return result;
      } catch (e: any) {
        console.log(`Provider ${index} failed: ${e.message}, trying next...`);
      }
    }
    throw new Error('All AI providers failed');
  }

  switchProvider(name: string): void {
    const index = this.providers.findIndex(p => p.constructor.name.toLowerCase().includes(name.toLowerCase()));
    if (index !== -1) this.currentIndex = index;
  }
}