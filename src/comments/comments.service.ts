import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommentsService {
  async createComment(postId: number, userId: number, content: string) {
    return prisma.comment.create({
      data: { content, postId, authorId: userId },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async getComments(postId: number) {
    return prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async deleteComment(commentId: number, userId: number) {
    return prisma.comment.delete({
      where: { id: commentId, authorId: userId },
    });
  }
}