import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class MessagesService {
  async sendMessage(senderId: number, receiverId: number, content: string) {
    const message = await prisma.message.create({
      data: { content, senderId, receiverId },
      include: {
        sender: { select: { id: true, username: true } },
        receiver: { select: { id: true, username: true } },
      },
    });

    // 发送通知给接收者
    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'message',
        message: `${message.sender.username} sent you a message: "${content.slice(0, 30)}${content.length > 30 ? '...' : ''}"`,
      },
    });

    return message;
  }

  async getConversation(userId: number, otherUserId: number) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, username: true } },
        receiver: { select: { id: true, username: true } },
      },
    });
  }

  async getConversationList(userId: number) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, username: true } },
        receiver: { select: { id: true, username: true } },
      },
    });
    const seen = new Set();
    const conversations: any[] = [];
    for (const msg of messages) {
      const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!seen.has(otherId)) {
        seen.add(otherId);
        conversations.push({
          user: msg.senderId === userId ? msg.receiver : msg.sender,
          lastMessage: msg.content,
          createdAt: msg.createdAt,
        });
      }
    }
    return conversations;
  }

  async getAllUsers(userId: number) {
    return prisma.user.findMany({
      where: { id: { not: userId } },
      select: { id: true, username: true, email: true },
    });
  }
}