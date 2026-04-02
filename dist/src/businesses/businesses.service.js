"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessesService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let BusinessesService = class BusinessesService {
    async getAll() {
        return prisma.business.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                owner: { select: { id: true, username: true } },
                followers: { include: { user: { select: { id: true, username: true } } } },
                _count: { select: { followers: true } },
            },
        });
    }
    async getMyBusinesses(userId) {
        return prisma.business.findMany({
            where: { ownerId: userId },
            include: {
                owner: { select: { id: true, username: true } },
                _count: { select: { followers: true } },
            },
        });
    }
    async create(data, userId) {
        return prisma.business.create({
            data: {
                name: data.name,
                description: data.description,
                category: data.category,
                location: data.location,
                website: data.website,
                phone: data.phone,
                email: data.email,
                ownerId: userId,
            },
        });
    }
    async toggleFollow(businessId, userId) {
        const existing = await prisma.businessFollower.findUnique({
            where: { businessId_userId: { businessId, userId } },
        });
        if (existing) {
            await prisma.businessFollower.delete({ where: { id: existing.id } });
            return { following: false };
        }
        else {
            await prisma.businessFollower.create({ data: { businessId, userId } });
            return { following: true };
        }
    }
    async delete(businessId, userId) {
        await prisma.businessFollower.deleteMany({ where: { businessId } });
        await prisma.business.delete({ where: { id: businessId, ownerId: userId } });
        return { success: true };
    }
};
exports.BusinessesService = BusinessesService;
exports.BusinessesService = BusinessesService = __decorate([
    (0, common_1.Injectable)()
], BusinessesService);
//# sourceMappingURL=businesses.service.js.map