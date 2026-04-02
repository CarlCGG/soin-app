"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let CommentsService = class CommentsService {
    async createComment(postId, userId, content) {
        const comment = await prisma.comment.create({
            data: { content, postId, authorId: userId },
            include: {
                author: { select: { id: true, username: true, avatar: true } },
            },
        });
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (post && post.authorId !== userId) {
            await prisma.notification.create({
                data: {
                    userId: post.authorId,
                    type: 'comment',
                    message: `Someone commented on your post: "${content.slice(0, 30)}"`,
                },
            });
        }
        return comment;
    }
    async getComments(postId) {
        return prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: 'asc' },
            include: {
                author: { select: { id: true, username: true, avatar: true } },
            },
        });
    }
    async deleteComment(commentId, userId) {
        return prisma.comment.delete({
            where: { id: commentId, authorId: userId },
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)()
], CommentsService);
//# sourceMappingURL=comments.service.js.map