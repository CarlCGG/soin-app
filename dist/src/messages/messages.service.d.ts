export declare class MessagesService {
    sendMessage(senderId: number, receiverId: number, content: string): Promise<{
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
    getConversation(userId: number, otherUserId: number): Promise<({
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
    getConversationList(userId: number): Promise<any[]>;
    getAllUsers(userId: number): Promise<{
        id: number;
        email: string;
        username: string;
    }[]>;
}
