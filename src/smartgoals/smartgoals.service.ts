import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SmartGoalsService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    return this.prisma.smartGoal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: number, data: any) {
    return this.prisma.smartGoal.create({
      data: {
        userId,
        description: data.description,
        measurable: data.measurable ?? false,
        hub: data.hub ?? null,
        startDate: data.startDate ?? null,
        duration: data.duration ?? null,
        durationUnit: data.durationUnit ?? 'Month',
        status: 'active',
        checkIns: 0,
      },
    });
  }

  async update(id: number, userId: number, data: any) {
    // 先确认目标属于该用户
    const goal = await this.prisma.smartGoal.findFirst({ where: { id, userId } });
    if (!goal) throw new NotFoundException('Goal not found');

    return this.prisma.smartGoal.update({
      where: { id },
      data: {
        description: data.description,
        measurable: data.measurable,
        hub: data.hub,
        startDate: data.startDate,
        duration: data.duration,
        durationUnit: data.durationUnit,
      },
    });
  }

  async togglePause(id: number, userId: number) {
    const goal = await this.prisma.smartGoal.findFirst({ where: { id, userId } });
    if (!goal) return null;

    const newStatus = goal.status === 'paused' ? 'active' : 'paused';
    
    return this.prisma.smartGoal.update({
      where: { id },
      data: { status: newStatus },
    });
  }

  async checkIn(id: number, userId: number) {
    const goal = await this.prisma.smartGoal.findFirst({ where: { id, userId } });
    if (!goal) return null;

    // 使用 increment 原子操作，比 (goal.checkIns + 1) 更安全
    return this.prisma.smartGoal.update({
      where: { id },
      data: { 
        checkIns: {
          increment: 1 
        } 
      },
    });
  }

  async delete(id: number, userId: number) {
    // 使用 deleteMany 是为了确保 userId 匹配，增加安全性
    return this.prisma.smartGoal.deleteMany({
      where: { id, userId },
    });
  }
}