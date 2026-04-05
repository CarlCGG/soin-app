import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class ConnectionsService {
  async sendRequest(fromUserId: number, toUserId: number) {
    const existing = await prisma.connection.findUnique({
      where: { fromUserId_toUserId: { fromUserId, toUserId } },
    });
    if (existing) return existing;
    return prisma.connection.create({
      data: { fromUserId, toUserId, status: 'pending' },
    });
  }

  async respondRequest(connectionId: number, userId: number, accept: boolean) {
    return prisma.connection.updateMany({
      where: { id: connectionId, toUserId: userId },
      data: { status: accept ? 'accepted' : 'rejected' },
    });
  }

  async getConnections(userId: number) {
    return prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: userId, status: 'accepted' },
          { toUserId: userId, status: 'accepted' },
        ],
      },
      include: {
        fromUser: { select: { id: true, username: true, bio: true } },
        toUser: { select: { id: true, username: true, bio: true } },
      },
    });
  }

  async getPendingRequests(userId: number) {
    return prisma.connection.findMany({
      where: { toUserId: userId, status: 'pending' },
      include: {
        fromUser: { select: { id: true, username: true, bio: true } },
      },
    });
  }

 async getConnectionStatus(fromUserId: number, toUserId: number) {
    const conn = await prisma.connection.findFirst({
      where: {
        OR: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      },
    });
    return conn ? conn.status : 'none';
  }

  async removeConnection(userId: number, otherUserId: number) {
    return prisma.connection.deleteMany({
      where: {
        OR: [
          { fromUserId: userId, toUserId: otherUserId },
          { fromUserId: otherUserId, toUserId: userId },
        ],
        status: 'accepted',
      },
    });
  }
}
