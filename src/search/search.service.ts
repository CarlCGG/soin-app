import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class SearchService {
  async search(query: string, currentUserId?: number) {
    const [users, posts, groups, events] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { bio: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: { id: true, username: true, bio: true, avatar: true },
        take: 5,
      }),
      prisma.post.findMany({
        where: { content: { contains: query, mode: 'insensitive' } },
        include: { author: { select: { id: true, username: true } } },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.group.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { location: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: { _count: { select: { members: true } } },
        take: 5,
      }),
      prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { location: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: { author: { select: { id: true, username: true } } },
        take: 5,
        orderBy: { date: 'asc' },
      }),
    ]);

    if (!currentUserId) return { users, posts, groups, events };

    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: currentUserId },
          { toUserId: currentUserId },
        ],
      },
    });

    const usersWithStatus = users.map((u: any) => {
      const conn = connections.find((c: any) =>
        (c.fromUserId === currentUserId && c.toUserId === u.id) ||
        (c.toUserId === currentUserId && c.fromUserId === u.id)
      );
      return { ...u, connectionStatus: conn?.status || 'none' };
    });

    return { users: usersWithStatus, posts, groups, events };
  }
}