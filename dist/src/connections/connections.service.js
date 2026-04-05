"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let ConnectionsService = class ConnectionsService {
    async sendRequest(fromUserId, toUserId) {
        const existing = await prisma.connection.findUnique({
            where: { fromUserId_toUserId: { fromUserId, toUserId } },
        });
        if (existing)
            return existing;
        return prisma.connection.create({
            data: { fromUserId, toUserId, status: 'pending' },
        });
    }
    async respondRequest(connectionId, userId, accept) {
        return prisma.connection.updateMany({
            where: { id: connectionId, toUserId: userId },
            data: { status: accept ? 'accepted' : 'rejected' },
        });
    }
    async getConnections(userId) {
        return prisma.connection.findMany({
            where: {
                OR: [
                    { fromUserId: userId, status: 'accepted' },
                    { toUserId: userId, status: 'accepted' },
                ],
            },
            include: {
                fromUser: { select: { id: true, username: true, bio: true } },
                toUser: { select: { id: true, username: true, bio: true } },
            },
        });
    }
    async getPendingRequests(userId) {
        return prisma.connection.findMany({
            where: { toUserId: userId, status: 'pending' },
            include: {
                fromUser: { select: { id: true, username: true, bio: true } },
            },
        });
    }
    async getConnectionStatus(fromUserId, toUserId) {
        const conn = await prisma.connection.findFirst({
            where: {
                OR: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId },
                ],
            },
        });
        return conn ? conn.status : 'none';
    }
    async removeConnection(userId, otherUserId) {
        return prisma.connection.deleteMany({
            where: {
                OR: [
                    { fromUserId: userId, toUserId: otherUserId },
                    { fromUserId: otherUserId, toUserId: userId },
                ],
                status: 'accepted',
            },
        });
    }
};
exports.ConnectionsService = ConnectionsService;
exports.ConnectionsService = ConnectionsService = __decorate([
    (0, common_1.Injectable)()
], ConnectionsService);
//# sourceMappingURL=connections.service.js.map