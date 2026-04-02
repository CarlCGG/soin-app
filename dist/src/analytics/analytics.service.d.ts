export declare class AnalyticsService {
    getAnalytics(userId: number): Promise<{
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
