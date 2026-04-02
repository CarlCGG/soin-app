"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let NotificationsService = class NotificationsService {
    async getAll(userId) {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async markAllRead(userId) {
        await prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true },
        });
        return { success: true };
    }
    async getUnreadCount(userId) {
        const count = await prisma.notification.count({
            where: { userId, read: false },
        });
        return { count };
    }
    async create(userId, type, message) {
        return prisma.notification.create({
            data: { userId, type, message },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map