import { NotificationsService } from './notifications.service';
import { JwtService } from '@nestjs/jwt';
export declare class NotificationsController {
    private notificationsService;
    private jwtService;
    constructor(notificationsService: NotificationsService, jwtService: JwtService);
    private getUser;
    getAll(auth: string): Promise<any>;
    getUnreadCount(auth: string): Promise<{
        count: any;
    }>;
    markAllRead(auth: string): Promise<{
        success: boolean;
    }>;
}
