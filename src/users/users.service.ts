import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(email: string, username: string, password: string) {
    return prisma.user.create({
      data: { email, username, password },
    });
  }

  async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        avatar: true,
        phone: true,
        website: true,
        gender: true,
        location: true,
        birthYear: true,
        ethnicity: true,
        createdAt: true,
        _count: { select: { posts: true } },
        posts: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, username: true } },
            likes: true,
            _count: { select: { comments: true } },
          },
        },
      },
    });

    const tagsRow = await prisma.$queryRaw<any[]>`SELECT tags FROM "User" WHERE id = ${userId}`;
    const tags = tagsRow[0]?.tags || null;

    const groupCount = await prisma.groupMember.count({ where: { userId } });

    const connections = await prisma.connection.findMany({
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

    return { ...user, tags, groupCount, connections };
  }

  async updateProfile(userId: number, data: any) {
    const { tags, ...rest } = data;

    if (rest.username) {
      const existing = await prisma.user.findUnique({ where: { username: rest.username } });
      if (existing && existing.id !== userId) {
        throw new BadRequestException('Username already taken');
      }
    }

    if (tags !== undefined) {
      await prisma.$executeRaw`UPDATE "User" SET tags = ${tags} WHERE id = ${userId}`;
    }
    if (Object.keys(rest).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: rest,
      });
    }
    return { success: true };
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const bcrypt = require('bcrypt');
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new Error('Wrong password');
    const hashed = await bcrypt.hash(newPassword, 10);
    return prisma.user.update({ where: { id: userId }, data: { password: hashed } });
  }

 async getSimilarUsers(userId: number) {
  console.log('getSimilarUsers called, userId:', userId);
  const rows = await prisma.$queryRaw<any[]>`SELECT tags, location FROM "User" WHERE id = ${userId}`;
  console.log('rows:', rows);
  const currentUser = rows[0];

    if (!currentUser?.tags) return { users: [], hasTags: false };

    const userTags = currentUser.tags.split(',').map((t: string) => t.trim().toLowerCase());

    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: userId, status: 'accepted' },
          { toUserId: userId, status: 'accepted' },
        ],
      },
    });

    const connectedIds = connections.map((c: any) =>
      c.fromUserId === userId ? c.toUserId : c.fromUserId
    );

    const allUsers = await prisma.$queryRaw<any[]>`
      SELECT id, username, bio, avatar, tags, location FROM "User" WHERE id != ${userId}
    `;

    const scored = allUsers.map((user: any) => {
      if (!user.tags) return { ...user, score: 0, connected: false };
      const theirTags = user.tags.split(',').map((t: string) => t.trim().toLowerCase());
      const score = userTags.filter((tag: string) => theirTags.includes(tag)).length;
      return { ...user, score, connected: connectedIds.includes(user.id) };
    }).filter((u: any) => u.score > 0).sort((a: any, b: any) => b.score - a.score);

    return { users: scored, hasTags: true };
  }

  async findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }
}