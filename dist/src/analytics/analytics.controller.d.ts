import { AnalyticsService } from './analytics.service';
import { JwtService } from '@nestjs/jwt';
export declare class AnalyticsController {
    private analyticsService;
    private jwtService;
    constructor(analyticsService: AnalyticsService, jwtService: JwtService);
    getAnalytics(auth: string): Promise<{
        totalUsers: any;
        totalGroups: any;
        totalBusinesses: any;
        totalEvents: any;
        userGroups: any;
        userEvents: any;
        upcomingEvents: any;
        missedEvents: any;
        userPosts: any;
        totalLikes: any;
        totalComments: any;
    }>;
}
