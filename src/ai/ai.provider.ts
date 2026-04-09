export interface AIProvider {
  chat(messages: { role: string; content: string }[], systemPrompt?: string): Promise<string>;
  generateText(prompt: string): Promise<string>;
}