import { MessagesService } from './messages.service';
import { JwtService } from '@nestjs/jwt';
export declare class MessagesController {
    private messagesService;
    private jwtService;
    constructor(messagesService: MessagesService, jwtService: JwtService);
    getConversationList(auth: string): Promise<any[]>;
    getAllUsers(auth: string): Promise<{
        id: number;
        email: string;
        username: string;
    }[]>;
    getConversation(auth: string, userId: string): Promise<({
        sender: {
            id: number;
            username: string;
        };
        receiver: {
            id: number;
            username: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        senderId: number;
        receiverId: number;
    })[]>;
    sendMessage(auth: string, body: {
        receiverId: number;
        content: string;
    }): Promise<{
        sender: {
            id: number;
            username: string;
        };
        receiver: {
            id: number;
            username: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        senderId: number;
        receiverId: number;
    }>;
}
