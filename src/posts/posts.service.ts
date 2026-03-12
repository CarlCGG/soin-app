import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PostsService {
  async createPost(userId: number, content: string, imageUrl?: string) {
    return prisma.post.create({
      data: { content, imageUrl, authorId: userId },
      include: { author: { select: { id: true, username: true, avatar: true } } },
    });
  }

 async getAllPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, username: true, avatar: true } },
      likes: true,
      _count: {
        select: { comments: true },
      },
    },
  });
}
  async likePost(postId: number, userId: number) {
    const existing = await prisma.like.findUnique({
      where: { postId_userId: { postId, userId } },
    });
    if (existing) {
      await prisma.like.delete({ where: { postId_userId: { postId, userId } } });
      return { liked: false };
    } else {
      await prisma.like.create({ data: { postId, userId } });
      return { liked: true };
    }
  }

  async deletePost(postId: number, userId: number) {
    return prisma.post.delete({
      where: { id: postId, authorId: userId },
    });
  }
}