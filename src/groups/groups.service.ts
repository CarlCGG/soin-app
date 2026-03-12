import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class GroupsService {
  async getAllGroups() {
    return prisma.group.findMany({
      include: {
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getGroupById(groupId: number) {
    return prisma.group.findUnique({
      where: { id: groupId },
      include: {
        _count: { select: { members: true } },
        members: {
          include: {
            user: { select: { id: true, username: true, avatar: true } },
          },
        },
      },
    });
  }

  async createGroup(name: string, description: string, category: string, location: string, userId: number) {
    const group = await prisma.group.create({
      data: { name, description, category, location },
    });
    await prisma.groupMember.create({
      data: { groupId: group.id, userId },
    });
    return group;
  }

  async joinGroup(groupId: number, userId: number) {
    const existing = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
    if (existing) {
      await prisma.groupMember.delete({
        where: { groupId_userId: { groupId, userId } },
      });
      return { joined: false };
    } else {
      await prisma.groupMember.create({
        data: { groupId, userId },
      });
      return { joined: true };
    }
  }

  async isMember(groupId: number, userId: number) {
    const existing = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
    return { isMember: !!existing };
  }

  async getGroupMessages(groupId: number) {
    return prisma.groupMessage.findMany({
      where: { groupId },
      orderBy: { createdAt: 'asc' },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async sendGroupMessage(groupId: number, userId: number, content: string) {
    return prisma.groupMessage.create({
      data: { content, groupId, authorId: userId },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }
}