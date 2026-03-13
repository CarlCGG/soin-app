export declare class AiService {
    generatePost(prompt: string): Promise<{
        content: string;
    }>;
    chat(messages: {
        role: string;
        content: string;
    }[]): Promise<{
        content: string;
    }>;
    suggestComment(postContent: string): Promise<{
        content: string;
    }>;
}
