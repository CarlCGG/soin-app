import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

@Injectable()
export class CommentsService {
  async createComment(postId: number, userId: number, content: string) {
    const comment = await prisma.comment.create({
      data: { content, postId, authorId: userId },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });

    // 发送通知给帖子作者
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post && post.authorId !== userId) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: 'comment',
          message: `Someone commented on your post: "${content.slice(0, 30)}"`,
        },
      });
    }

    return comment;
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