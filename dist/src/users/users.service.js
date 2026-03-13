"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let UsersService = class UsersService {
    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async createUser(email, username, password) {
        return prisma.user.create({
            data: { email, username, password },
        });
    }
    async getProfile(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                bio: true,
                avatar: true,
                createdAt: true,
                _count: {
                    select: { posts: true },
                },
                posts: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        author: { select: { id: true, username: true } },
                        likes: true,
                        _count: { select: { comments: true } },
                    },
                },
            },
        });
        const groupCount = await prisma.groupMember.count({
            where: { userId },
        });
        return { ...user, groupCount };
    }
    async updateProfile(userId, bio) {
        return prisma.user.update({
            where: { id: userId },
            data: { bio },
            select: { id: true, username: true, email: true, bio: true },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map