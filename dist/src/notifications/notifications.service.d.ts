export declare class NotificationsService {
    getAll(userId: number): Promise<any>;
    markAllRead(userId: number): Promise<{
        success: boolean;
    }>;
    getUnreadCount(userId: number): Promise<{
        count: any;
    }>;
    create(userId: number, type: string, message: string): Promise<any>;
}
