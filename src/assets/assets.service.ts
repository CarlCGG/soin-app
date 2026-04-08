import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async getAll(type?: string) {
    return this.prisma.asset.findMany({
      where: type ? { type } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async getMy(userId: number) {
    return this.prisma.asset.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }



  async update(id: number, data: any) {
    try {
      const currentAsset = await this.prisma.asset.findUnique({ 
        where: { id } 
      });

      if (!currentAsset) {
        throw new NotFoundException(`Asset with ID ${id} not found`);
      }

      let finalQuantity: number | undefined = undefined;

      if (data.quantity !== undefined) {
        const targetQty = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity;

        const currentQty = currentAsset.quantity ?? 0;

        if (currentQty <= 0 && targetQty < currentQty) {
          throw new Error('OUT_OF_STOCK');
        }
        
        finalQuantity = Math.max(0, targetQty);
      }

      return await this.prisma.asset.update({
        where: { id },
        data: {
          ...(finalQuantity !== undefined && { quantity: finalQuantity }),
  
          ...(data.isAvailable !== undefined 
              ? { isAvailable: data.isAvailable } 
              : (finalQuantity === 0 && { isAvailable: false })
          ),
        
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.location && { location: data.location }),
          
         
          ...(data.amount !== undefined && { amount: parseFloat(data.amount) }),
          ...(data.hourlyRate !== undefined && { hourlyRate: parseFloat(data.hourlyRate) }),
          ...(data.dailyRate !== undefined && { dailyRate: parseFloat(data.dailyRate) }),
        },
      });
    } catch (error: any) { 
      if (error instanceof Error && error.message === 'OUT_OF_STOCK') {
        throw new Error('Cannot book: This item is already out of stock.');
      }
      throw error;
    }
  }

  async create(data: any, userId: number) {
    return this.prisma.asset.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,         
        category: data.category,
        imageUrl: data.imageUrl,
        location: data.location,
        authorId: userId,

        availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
        availableUntil: data.availableUntil ? new Date(data.availableUntil) : null,
        daysAvailable: data.daysAvailable, 
        isAvailable: data.isAvailable ?? true,

        quantity: data.quantity ? parseInt(data.quantity) : 1,
        amount: data.amount ? parseFloat(data.amount) : null,

        peopleCount: data.peopleCount ? parseInt(data.peopleCount) : null,
        hourlyRate: data.hourlyRate ? parseFloat(data.hourlyRate) : null,

        capacity: data.capacity ? parseInt(data.capacity) : null,
        dailyRate: data.dailyRate ? parseFloat(data.dailyRate) : null,
      },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async delete(assetId: number, userId: number) {
    return this.prisma.asset.delete({
      where: { id: assetId, authorId: userId },
    });
  }

  async cancel(id: number) {
    try {
      const currentAsset = await this.prisma.asset.findUnique({ where: { id } });
      if (!currentAsset) throw new NotFoundException('Asset not found');

      return await this.prisma.asset.update({
        where: { id },
        data: {
          quantity: (currentAsset.quantity ?? 0) + 1, 
          isAvailable: true, 
        },
      });
    } catch (error) {
      throw new Error('Cancel booking failed');
    }
  }
}