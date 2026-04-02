"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let AssetsService = class AssetsService {
    async getAll(type) {
        return prisma.asset.findMany({
            where: type ? { type } : {},
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { id: true, username: true } },
            },
        });
    }
    async getMy(userId) {
        return prisma.asset.findMany({
            where: { authorId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { id: true, username: true } },
            },
        });
    }
    async create(data, userId) {
        return prisma.asset.create({
            data: {
                title: data.title,
                description: data.description,
                type: data.type,
                category: data.category,
                imageUrl: data.imageUrl,
                authorId: userId,
            },
            include: {
                author: { select: { id: true, username: true } },
            },
        });
    }
    async delete(assetId, userId) {
        return prisma.asset.delete({
            where: { id: assetId, authorId: userId },
        });
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)()
], AssetsService);
//# sourceMappingURL=assets.service.js.map