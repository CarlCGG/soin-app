"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let GroupsService = class GroupsService {
    async getAllGroups() {
        return prisma.group.findMany({
            include: {
                _count: { select: { members: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getGroupById(groupId) {
        return prisma.group.findUnique({
            where: { id: groupId },
            include: {
                _count: { select: { members: true } },
                members: {
                    include: {
                        user: { select: { id: true, username: true, avatar: true } },
                    },
                },
            },
        });
    }
    async createGroup(name, description, category, location, userId) {
        const group = await prisma.group.create({
            data: { name, description, category, location },
        });
        await prisma.groupMember.create({
            data: { groupId: group.id, userId },
        });
        return group;
    }
    async joinGroup(groupId, userId) {
        const existing = await prisma.groupMember.findUnique({
            where: { groupId_userId: { groupId, userId } },
        });
        if (existing) {
            await prisma.groupMember.delete({
                where: { groupId_userId: { groupId, userId } },
            });
            return { joined: false };
        }
        else {
            await prisma.groupMember.create({
                data: { groupId, userId },
            });
            return { joined: true };
        }
    }
    async isMember(groupId, userId) {
        const existing = await prisma.groupMember.findUnique({
            where: { groupId_userId: { groupId, userId } },
        });
        return { isMember: !!existing };
    }
    async getGroupMessages(groupId) {
        return prisma.groupMessage.findMany({
            where: { groupId },
            orderBy: { createdAt: 'asc' },
            include: {
                author: { select: { id: true, username: true, avatar: true } },
            },
        });
    }
    async sendGroupMessage(groupId, userId, content) {
        return prisma.groupMessage.create({
            data: { content, groupId, authorId: userId },
            include: {
                author: { select: { id: true, username: true, avatar: true } },
            },
        });
    }
    async deleteGroup(groupId, userId) {
        const group = await prisma.group.findUnique({ where: { id: groupId } });
        if (!group)
            throw new Error('Group not found');
        await prisma.groupMessage.deleteMany({ where: { groupId } });
        await prisma.groupMember.deleteMany({ where: { groupId } });
        await prisma.group.delete({ where: { id: groupId } });
        return { success: true };
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)()
], GroupsService);
//# sourceMappingURL=groups.service.js.map