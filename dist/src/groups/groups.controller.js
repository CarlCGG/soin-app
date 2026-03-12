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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const jwt_1 = require("@nestjs/jwt");
let GroupsController = class GroupsController {
    groupsService;
    jwtService;
    constructor(groupsService, jwtService) {
        this.groupsService = groupsService;
        this.jwtService = jwtService;
    }
    getAllGroups() {
        return this.groupsService.getAllGroups();
    }
    getGroupById(id) {
        return this.groupsService.getGroupById(Number(id));
    }
    createGroup(auth, body) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.groupsService.createGroup(body.name, body.description, body.category, body.location, decoded.sub);
    }
    joinGroup(auth, id) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.groupsService.joinGroup(Number(id), decoded.sub);
    }
    getGroupMessages(id) {
        return this.groupsService.getGroupMessages(Number(id));
    }
    sendGroupMessage(auth, id, body) {
        const token = auth.replace('Bearer ', '');
        const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
        return this.groupsService.sendGroupMessage(Number(id), decoded.sub, body.content);
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getAllGroups", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroupById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Post)(':id/join'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Get)(':id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroupMessages", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "sendGroupMessage", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [groups_service_1.GroupsService,
        jwt_1.JwtService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map