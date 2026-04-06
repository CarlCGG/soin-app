import { Injectable } from '@nestjs/common';
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
      _count: {
        select: { posts: true },
      },
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

  const groupCount = await prisma.groupMember.count({
    where: { userId },
  });

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

  return { ...user, groupCount, connections };
}

 async updateProfile(userId: number, data: {
  bio?: string; username?: string; phone?: string; website?: string; gender?: string;
  location?: string; birthYear?: string; ethnicity?: string; avatar?: string;
}) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, username: true, email: true, bio: true },
  });
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
}