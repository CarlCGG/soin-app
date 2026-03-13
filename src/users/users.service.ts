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

  return { ...user, groupCount };
}

  async updateProfile(userId: number, bio: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { bio },
      select: { id: true, username: true, email: true, bio: true },
    });
  }
}