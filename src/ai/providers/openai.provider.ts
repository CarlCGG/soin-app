import { AIProvider } from '../ai.provider';

export class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: { role: string; content: string }[], systemPrompt?: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
          ...messages,
        ],
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  }

  async generateText(prompt: string): Promise<string> {
    return this.chat([{ role: 'user', content: prompt }]);
  }
}