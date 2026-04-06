import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class NotificationsService {
  async getAll(userId: number) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markAllRead(userId: number) {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
    return { success: true };
  }

  async getUnreadCount(userId: number) {
    const count = await prisma.notification.count({
      where: { userId, read: false },
    });
    return { count };
  }

  async create(userId: number, type: string, message: string) {
    return prisma.notification.create({
      data: { userId, type, message },
    });
  }
}