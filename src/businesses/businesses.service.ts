import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 

@Injectable()
export class BusinessesService {

  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.business.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { id: true, username: true, avatar: true } },
        followers: { include: { user: { select: { id: true, username: true } } } },
        _count: { select: { followers: true } },
      },
    });
  }


  async getConnectionsBusinesses(userId: number) {
  const connections = await this.prisma.connection.findMany({
    where: {
      status: 'accepted',
      OR: [
        { fromUserId: userId },
        { toUserId: userId },
      ],
    },
  });

  const friendIds = connections
  .map(conn => (conn.fromUserId === userId ? conn.toUserId : conn.fromUserId))
  .filter(id => id !== userId); 

  if (friendIds.length === 0) {
    return [];
  }


  return this.prisma.business.findMany({
    where: {
      ownerId: { in: friendIds }, 
    },
    include: {
      owner: { select: { id: true, username: true, avatar: true } },
      _count: { select: { followers: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

  async getMyBusinesses(userId: number) {
    return this.prisma.business.findMany({
      where: { ownerId: userId },
      include: {
        owner: { select: { id: true, username: true } },
        _count: { select: { followers: true } },
      },
    });
  }

  async create(data: any, userId: number) {
    return this.prisma.business.create({
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
    const existing = await this.prisma.businessFollower.findUnique({
      where: { businessId_userId: { businessId, userId } },
    });
    if (existing) {
      await this.prisma.businessFollower.delete({ where: { id: existing.id } });
      return { following: false };
    } else {
      await this.prisma.businessFollower.create({ data: { businessId, userId } });
      return { following: true };
    }
  }

  async delete(businessId: number, userId: number) {
    await this.prisma.businessFollower.deleteMany({ where: { businessId } });
    return this.prisma.business.delete({ 
      where: { id: businessId, ownerId: userId } 
    });
  }
}