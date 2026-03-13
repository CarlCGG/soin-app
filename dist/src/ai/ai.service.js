"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI('AIzaSyDx3NaVAMmBMFwRZZeB8BsA8Ibb6uwGtqo');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
let AiService = class AiService {
    async generatePost(prompt) {
        const result = await model.generateContent(`You are a social media post writer. Write a concise and engaging social media post in English, under 100 words. Topic: ${prompt}`);
        return { content: result.response.text() };
    }
    async chat(messages) {
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
    async suggestComment(postContent) {
        const result = await model.generateContent(`Based on the following post, suggest 3 interesting comments in English, each under 20 words. Use numbered list format:\n\n${postContent}`);
        return { content: result.response.text() };
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map