import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class BusinessesService {
  async getAll() {
    return prisma.business.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { id: true, username: true } },
        followers: { include: { user: { select: { id: true, username: true } } } },
        _count: { select: { followers: true } },
        
        },
    });
  }

  async getMyBusinesses(userId: number) {
    return prisma.business.findMany({
      where: { ownerId: userId },
      include: {
        owner: { select: { id: true, username: true } },
        _count: { select: { followers: true } },
      },
    });
  }

  async create(data: any, userId: number) {
    return prisma.business.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        location: data.location,
        website: data.website,
        phone: data.phone,
        email: data.email,
        ownerId: userId,
      },
    });
  }

  async toggleFollow(businessId: number, userId: number) {
    const existing = await prisma.businessFollower.findUnique({
      where: { businessId_userId: { businessId, userId } },
    });
    if (existing) {
      await prisma.businessFollower.delete({ where: { id: existing.id } });
      return { following: false };
    } else {
      await prisma.businessFollower.create({ data: { businessId, userId } });
      return { following: true };
    }
  }

  async delete(businessId: number, userId: number) {
    await prisma.businessFollower.deleteMany({ where: { businessId } });
    await prisma.business.delete({ where: { id: businessId, ownerId: userId } });
    return { success: true };
  }
}