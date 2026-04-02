import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class AnalyticsService {
  async getAnalytics(userId: number) {
    const now = new Date();

    const [
      totalUsers,
      totalGroups,
      totalBusinesses,
      totalEvents,
      userGroups,
      userEvents,
      upcomingEvents,
      userPosts,
      totalLikes,
      totalComments,
    ] = await Promise.all([
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
}