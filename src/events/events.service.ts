import { Injectable } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

@Injectable()
export class EventsService {

  // Get all events sorted by date ascending, with author, attendees and attendee count
 async getAll(groupId?: number) {
  const result = await prisma.event.findMany({
    where: groupId ? { groupId } : {},   // Filter by groupId if provided
    orderBy: { date: 'asc' },
    include: {
      author: { select: { id: true, username: true } },
      attendees: { include: { user: { select: { id: true, username: true } } } },
      _count: { select: { attendees: true } },
    },
  });
  console.log('Event sample:', JSON.stringify(result[0], null, 2));
  return result;
}

  // Create a new event — handles optional fields and type conversion
  async create(data: any, userId: number) {
    console.log('Creating event with data:', JSON.stringify(data).substring(0, 200));
    try {
      const result = await prisma.event.create({
        data: {
          title: data.title,
          description: data.description || null,
          location: data.location,
          date: new Date(data.date),                                    // Convert date string to Date object
          endTime: data.endTime ? new Date(data.endTime) : null,        // Optional end time
          category: data.category || 'General',                         // Default to 'General' if not provided
          imageUrl: data.imageUrl || null,
          capacity: data.capacity ? parseInt(data.capacity) : null,     // Optional capacity limit
          recurring: data.recurring || false,
          groupId: data.groupId ? parseInt(data.groupId) : null,        // Optional group association
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

  // Toggle attendance — removes if already attending, adds if not
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

  // Delete an event — removes all attendees first to avoid foreign key constraint errors
  async delete(eventId: number) {
    await prisma.eventAttendee.deleteMany({ where: { eventId } });
    await prisma.event.delete({ where: { id: eventId } });
    return { success: true };
  }

  // Mark a user as checked in for an event they are already attending
  async checkIn(eventId: number, userId: number) {
    return prisma.eventAttendee.update({
      where: { eventId_userId: { eventId, userId } },
      data: { checkedIn: true },
    });
  }
}