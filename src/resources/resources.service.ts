import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class ResourcesService {
  async getAll(type?: string) {
    return prisma.resource.findMany({
      where: type ? { type } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async create(data: any, userId: number) {
    return prisma.resource.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        url: data.url,
        thumbnail: data.thumbnail,
        authorId: userId,
      },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async delete(resourceId: number, userId: number) {
    return prisma.resource.delete({
      where: { id: resourceId, authorId: userId },
    });
  }
}