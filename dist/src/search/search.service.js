"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let SearchService = class SearchService {
    async search(query) {
        const [users, posts, groups, events] = await Promise.all([
            prisma.user.findMany({
                where: {
                    OR: [
                        { username: { contains: query, mode: 'insensitive' } },
                        { bio: { contains: query, mode: 'insensitive' } },
                    ],
                },
                select: { id: true, username: true, bio: true },
                take: 5,
            }),
            prisma.post.findMany({
                where: { content: { contains: query, mode: 'insensitive' } },
                include: { author: { select: { id: true, username: true } } },
                take: 5,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.group.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { location: { contains: query, mode: 'insensitive' } },
                    ],
                },
                include: { _count: { select: { members: true } } },
                take: 5,
            }),
            prisma.event.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { location: { contains: query, mode: 'insensitive' } },
                    ],
                },
                include: { author: { select: { id: true, username: true } } },
                take: 5,
                orderBy: { date: 'asc' },
            }),
        ]);
        return { users, posts, groups, events };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)()
], SearchService);
//# sourceMappingURL=search.service.js.map