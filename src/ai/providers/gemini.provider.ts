import { AIProvider } from '../ai.provider';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider implements AIProvider {
  private model: any;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async chat(messages: { role: string; content: string }[], systemPrompt?: string): Promise<string> {
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
    const lastMessage = messages[messages.length - 1].content;
    const chat = this.model.startChat({
      history,
      systemInstruction: { role: 'system', parts: [{ text: systemPrompt || 'You are a helpful assistant.' }] },
    });
    const result = await chat.sendMessage(lastMessage);
    return result.response.text();
  }

  async generateText(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}