import { AiService } from './ai.service';
export declare class AiController {
    private aiService;
    constructor(aiService: AiService);
    generatePost(body: {
        prompt: string;
    }): Promise<{
        content: string;
    }>;
    chat(body: {
        messages: {
            role: string;
            content: string;
        }[];
    }): Promise<{
        content: string;
    }>;
    suggestComment(body: {
        postContent: string;
    }): Promise<{
        content: string;
    }>;
}
