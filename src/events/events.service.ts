import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class EventsService {
  async getAll() {
  const result = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    include: {
      author: { select: { id: true, username: true } },
      attendees: { include: { user: { select: { id: true, username: true } } } },
      _count: { select: { attendees: true } },
    },
  });
  console.log('Event sample:', JSON.stringify(result[0], null, 2));  // ← 加这行
  return result;
}

  async create(data: any, userId: number) {
    console.log('Creating event with data:', JSON.stringify(data).substring(0, 200));
    try {
      const result = await prisma.event.create({
        data: {
          title: data.title,
          description: data.description || null,
          location: data.location,
          date: new Date(data.date),
          endTime: data.endTime ? new Date(data.endTime) : null,
          category: data.category || 'General',
          imageUrl: data.imageUrl || null,
          capacity: data.capacity ? parseInt(data.capacity) : null,
          recurring: data.recurring || false,
          groupId: data.groupId ? parseInt(data.groupId) : null,
          authorId: userId,
        },
      });
      console.log('Event created:', result.id);
      return result;
    } catch (err) {
      console.error('Create event error:', err);
      throw err;
    }
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

  async checkIn(eventId: number, userId: number) {
    return prisma.eventAttendee.update({
      where: { eventId_userId: { eventId, userId } },
      data: { checkedIn: true },
    });
  }
}