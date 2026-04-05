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
exports.ConnectionsController = void 0;
const common_1 = require("@nestjs/common");
const connections_service_1 = require("./connections.service");
const jwt_1 = require("@nestjs/jwt");
let ConnectionsController = class ConnectionsController {
    connectionsService;
    jwtService;
    constructor(connectionsService, jwtService) {
        this.connectionsService = connectionsService;
        this.jwtService = jwtService;
    }
    getUser(auth) {
        const token = auth.replace('Bearer ', '');
        return this.jwtService.verify(token, { secret: 'my_secret_key' });
    }
    sendRequest(auth, toUserId) {
        const decoded = this.getUser(auth);
        return this.connectionsService.sendRequest(decoded.sub, Number(toUserId));
    }
    respond(auth, connectionId, body) {
        const decoded = this.getUser(auth);
        return this.connectionsService.respondRequest(Number(connectionId), decoded.sub, body.accept);
    }
    getConnections(auth) {
        const decoded = this.getUser(auth);
        return this.connectionsService.getConnections(decoded.sub);
    }
    getPending(auth) {
        const decoded = this.getUser(auth);
        return this.connectionsService.getPendingRequests(decoded.sub);
    }
    getStatus(auth, toUserId) {
        const decoded = this.getUser(auth);
        return this.connectionsService.getConnectionStatus(decoded.sub, Number(toUserId));
    }
    removeConnection(auth, otherUserId) {
        const decoded = this.getUser(auth);
        return this.connectionsService.removeConnection(decoded.sub, Number(otherUserId));
    }
};
exports.ConnectionsController = ConnectionsController;
__decorate([
    (0, common_1.Post)('request/:toUserId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('toUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConnectionsController.prototype, "sendRequest", null);
__decorate([
    (0, common_1.Post)('respond/:connectionId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('connectionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ConnectionsController.prototype, "respond", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConnectionsController.prototype, "getConnections", null);
__decorate([
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConnectionsController.prototype, "getPending", null);
__decorate([
    (0, common_1.Get)('status/:toUserId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('toUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConnectionsController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Delete)('remove/:otherUserId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('otherUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConnectionsController.prototype, "removeConnection", null);
exports.ConnectionsController = ConnectionsController = __decorate([
    (0, common_1.Controller)('connections'),
    __metadata("design:paramtypes", [connections_service_1.ConnectionsService,
        jwt_1.JwtService])
], ConnectionsController);
//# sourceMappingURL=connections.controller.js.map