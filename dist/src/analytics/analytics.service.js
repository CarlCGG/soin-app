"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let AnalyticsService = class AnalyticsService {
    async getAnalytics(userId) {
        const now = new Date();
        const [totalUsers, totalGroups, totalBusinesses, totalEvents, userGroups, userEvents, upcomingEvents, userPosts, totalLikes, totalComments,] = await Promise.all([
            prisma.user.count(),
            prisma.group.count(),
            prisma.business.count(),
            prisma.event.count(),
            prisma.groupMember.findMany({
                where: { userId },
                include: { group: { include: { _count: { select: { members: true } } } } },
            }),
            prisma.eventAttendee.count({ where: { userId } }),
            prisma.event.count({ where: { date: { gt: now } } }),
            prisma.post.count({ where: { authorId: userId } }),
            prisma.like.count({ where: { post: { authorId: userId } } }),
            prisma.comment.count({ where: { post: { authorId: userId } } }),
        ]);
        const missedEvents = await prisma.event.count({
            where: { date: { lt: now } },
        });
        return {
            totalUsers,
            totalGroups,
            totalBusinesses,
            totalEvents,
            userGroups,
            userEvents,
            upcomingEvents,
            missedEvents,
            userPosts,
            totalLikes,
            totalComments,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)()
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map