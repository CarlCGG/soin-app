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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const jwt_1 = require("@nestjs/jwt");
let MessagesController = class MessagesController {
    messagesService;
    jwtService;
    constructor(messagesService, jwtService) {
        this.messagesService = messagesService;
        this.jwtService = jwtService;
    }
    getConversationList(auth) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.messagesService.getConversationList(decoded.sub);
    }
    getAllUsers(auth) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.messagesService.getAllUsers(decoded.sub);
    }
    getConversation(auth, userId) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.messagesService.getConversation(decoded.sub, Number(userId));
    }
    sendMessage(auth, body) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.messagesService.sendMessage(decoded.sub, body.receiverId, body.content);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)('conversations'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getConversationList", null);
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "sendMessage", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        jwt_1.JwtService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map