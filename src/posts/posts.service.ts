import { Injectable, BadRequestException } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class PostsService {
  constructor(private aiService: AiService) {}

  async createPost(userId: number, content: string, imageUrl?: string, visibility: string = 'everyone') {
    // AI 内容审核
    try {
      const moderation = await this.aiService.moderateContent(content);
      if (!moderation.safe) {
    throw new BadRequestException('Your post contains inappropriate or illegal content and cannot be published. Please review our community guidelines.');
  }
    } catch (e: any) {
      if (e.status === 400 || e.message?.includes('inappropriate')) throw e;
      // AI 审核失败时放行，不影响正常发帖
    }

    return prisma.post.create({
      data: { content, imageUrl, authorId: userId, visibility },
      include: { author: { select: { id: true, username: true, avatar: true } } },
    });
  }


  async getAllPosts(currentUserId?: number) {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
        likes: true,
        _count: { select: { comments: true } },
      },
    });

    if (!currentUserId) return posts.filter((p: any) => p.visibility === 'everyone');

    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: currentUserId, status: 'accepted' },
          { toUserId: currentUserId, status: 'accepted' },
        ],
      },
    });

    const connectedIds = connections.map((c: any) =>
      c.fromUserId === currentUserId ? c.toUserId : c.fromUserId
    );

    return posts.filter((post: any) => {
      if (post.authorId === currentUserId) return true;
      if (post.visibility === 'only_me') return false;
      if (post.visibility === 'connections') return connectedIds.includes(post.authorId);
      return true;
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
      const post = await prisma.post.findUnique({ where: { id: postId }, include: { author: true } });
      if (post && post.authorId !== userId) {
        await prisma.notification.create({
          data: {
            userId: post.authorId,
            type: 'like',
            message: `Someone liked your post: "${post.content.slice(0, 30)}..."`,
          },
        });
      }
      return { liked: true };
    }
  }

  async deletePost(postId: number, userId: number) {
    return prisma.post.delete({
      where: { id: postId, authorId: userId },
    });
  }
}