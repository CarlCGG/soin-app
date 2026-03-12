"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let MessagesService = class MessagesService {
    async sendMessage(senderId, receiverId, content) {
        return prisma.message.create({
            data: { content, senderId, receiverId },
            include: {
                sender: { select: { id: true, username: true } },
                receiver: { select: { id: true, username: true } },
            },
        });
    }
    async getConversation(userId, otherUserId) {
        return prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: 'asc' },
            include: {
                sender: { select: { id: true, username: true } },
                receiver: { select: { id: true, username: true } },
            },
        });
    }
    async getConversationList(userId) {
        const messages = await prisma.message.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            orderBy: { createdAt: 'desc' },
            include: {
                sender: { select: { id: true, username: true } },
                receiver: { select: { id: true, username: true } },
            },
        });
        const seen = new Set();
        const conversations = [];
        for (const msg of messages) {
            const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId;
            if (!seen.has(otherId)) {
                seen.add(otherId);
                conversations.push({
                    user: msg.senderId === userId ? msg.receiver : msg.sender,
                    lastMessage: msg.content,
                    createdAt: msg.createdAt,
                });
            }
        }
        return conversations;
    }
    async getAllUsers(userId) {
        return prisma.user.findMany({
            where: { id: { not: userId } },
            select: { id: true, username: true, email: true },
        });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)()
], MessagesService);
//# sourceMappingURL=messages.service.js.map