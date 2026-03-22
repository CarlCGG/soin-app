"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let EventsService = class EventsService {
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
    async create(data, userId) {
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
    async toggleAttend(eventId, userId) {
        const existing = await prisma.eventAttendee.findUnique({
            where: { eventId_userId: { eventId, userId } },
        });
        if (existing) {
            await prisma.eventAttendee.delete({ where: { id: existing.id } });
            return { attending: false };
        }
        else {
            await prisma.eventAttendee.create({ data: { eventId, userId } });
            return { attending: true };
        }
    }
    async delete(eventId) {
        await prisma.eventAttendee.deleteMany({ where: { eventId } });
        await prisma.event.delete({ where: { id: eventId } });
        return { success: true };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)()
], EventsService);
//# sourceMappingURL=events.service.js.map