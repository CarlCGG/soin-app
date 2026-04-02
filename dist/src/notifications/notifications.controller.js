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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const jwt_1 = require("@nestjs/jwt");
let NotificationsController = class NotificationsController {
    notificationsService;
    jwtService;
    constructor(notificationsService, jwtService) {
        this.notificationsService = notificationsService;
        this.jwtService = jwtService;
    }
    getUser(auth) {
        const token = auth.replace('Bearer ', '');
        return this.jwtService.verify(token, { secret: 'my_secret_key' });
    }
    getAll(auth) {
        const decoded = this.getUser(auth);
        return this.notificationsService.getAll(decoded.sub);
    }
    getUnreadCount(auth) {
        const decoded = this.getUser(auth);
        return this.notificationsService.getUnreadCount(decoded.sub);
    }
    markAllRead(auth) {
        const decoded = this.getUser(auth);
        return this.notificationsService.markAllRead(decoded.sub);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Put)('mark-read'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markAllRead", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        jwt_1.JwtService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map