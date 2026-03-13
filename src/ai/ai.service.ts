import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDx3NaVAMmBMFwRZZeB8BsA8Ibb6uwGtqo');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

@Injectable()
export class AiService {
  async generatePost(prompt: string) {
    const result = await model.generateContent(
      `You are a social media post writer. Write a concise and engaging social media post in English, under 100 words. Topic: ${prompt}`
    );
    return { content: result.response.text() };
  }

  async chat(messages: { role: string; content: string }[]) {
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
    const lastMessage = messages[messages.length - 1].content;
    const chat = model.startChat({
      history,
      systemInstruction: 'You are a helpful AI assistant for SOIN social platform. Always respond in English in a friendly and helpful manner.',
    });
    const result = await chat.sendMessage(lastMessage);
    return { content: result.response.text() };
  }

  async suggestComment(postContent: string) {
    const result = await model.generateContent(
      `Based on the following post, suggest 3 interesting comments in English, each under 20 words. Use numbered list format:\n\n${postContent}`
    );
    return { content: result.response.text() };
  }
}
