import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class AssetsService {
  async getAll(type?: string) {
    return prisma.asset.findMany({
      where: type ? { type } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async getMy(userId: number) {
    return prisma.asset.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async create(data: any, userId: number) {
    return prisma.asset.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        category: data.category,
        imageUrl: data.imageUrl,
        authorId: userId,
      },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async delete(assetId: number, userId: number) {
    return prisma.asset.delete({
      where: { id: assetId, authorId: userId },
    });
  }
}