import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class EventsService {
    async getAll() {
    return prisma.event.findMany({
        orderBy: { date: 'asc' },
        include: {
        author: { select: { id: true, username: true } },
        attendees: { include: { user: { select: { id: true, username: true } } } },
        _count: { select: { attendees: true } },
        },
    });
    }

  async create(data: any, userId: number) {
    return prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        date: new Date(data.date.replace(' ', 'T')),
        category: data.category,
        authorId: userId,
      },
    });
  }

  async toggleAttend(eventId: number, userId: number) {
    const existing = await prisma.eventAttendee.findUnique({
      where: { eventId_userId: { eventId, userId } },
    });
    if (existing) {
      await prisma.eventAttendee.delete({ where: { id: existing.id } });
      return { attending: false };
    } else {
      await prisma.eventAttendee.create({ data: { eventId, userId } });
      return { attending: true };
    }
  }

  async delete(eventId: number) {
    await prisma.eventAttendee.deleteMany({ where: { eventId } });
    await prisma.event.delete({ where: { id: eventId } });
    return { success: true };
  }
}