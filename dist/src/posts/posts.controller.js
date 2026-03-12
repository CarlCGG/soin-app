"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const jwt_1 = require("@nestjs/jwt");
let PostsController = class PostsController {
    postsService;
    jwtService;
    constructor(postsService, jwtService) {
        this.postsService = postsService;
        this.jwtService = jwtService;
    }
    getAllPosts() {
        return this.postsService.getAllPosts();
    }
    createPost(auth, body) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.postsService.createPost(decoded.sub, body.content, body.imageUrl);
    }
    likePost(auth, id) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.postsService.likePost(Number(id), decoded.sub);
    }
    deletePost(auth, id) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.postsService.deletePost(Number(id), decoded.sub);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        jwt_1.JwtService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map