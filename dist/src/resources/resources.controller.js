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
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const resources_service_1 = require("./resources.service");
const jwt_1 = require("@nestjs/jwt");
let ResourcesController = class ResourcesController {
    resourcesService;
    jwtService;
    constructor(resourcesService, jwtService) {
        this.resourcesService = resourcesService;
        this.jwtService = jwtService;
    }
    getUser(auth) {
        const token = auth.replace('Bearer ', '');
        return this.jwtService.verify(token, { secret: 'my_secret_key' });
    }
    getAll(type) {
        return this.resourcesService.getAll(type);
    }
    create(body, auth) {
        const decoded = this.getUser(auth);
        return this.resourcesService.create(body, decoded.sub);
    }
    delete(id, auth) {
        const decoded = this.getUser(auth);
        return this.resourcesService.delete(parseInt(id), decoded.sub);
    }
};
exports.ResourcesController = ResourcesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "delete", null);
exports.ResourcesController = ResourcesController = __decorate([
    (0, common_1.Controller)('resources'),
    __metadata("design:paramtypes", [resources_service_1.ResourcesService,
        jwt_1.JwtService])
], ResourcesController);
//# sourceMappingURL=resources.controller.js.map