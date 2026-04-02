"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let ResourcesService = class ResourcesService {
    async getAll(type) {
        return prisma.resource.findMany({
            where: type ? { type } : {},
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { id: true, username: true } },
            },
        });
    }
    async create(data, userId) {
        return prisma.resource.create({
            data: {
                title: data.title,
                description: data.description,
                type: data.type,
                url: data.url,
                thumbnail: data.thumbnail,
                authorId: userId,
            },
            include: {
                author: { select: { id: true, username: true } },
            },
        });
    }
    async delete(resourceId, userId) {
        return prisma.resource.delete({
            where: { id: resourceId, authorId: userId },
        });
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)()
], ResourcesService);
//# sourceMappingURL=resources.service.js.map