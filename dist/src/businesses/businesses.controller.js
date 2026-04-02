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
exports.BusinessesController = void 0;
const common_1 = require("@nestjs/common");
const businesses_service_1 = require("./businesses.service");
const jwt_1 = require("@nestjs/jwt");
let BusinessesController = class BusinessesController {
    businessesService;
    jwtService;
    constructor(businessesService, jwtService) {
        this.businessesService = businessesService;
        this.jwtService = jwtService;
    }
    getUser(auth) {
        const token = auth.replace('Bearer ', '');
        return this.jwtService.verify(token, { secret: 'my_secret_key' });
    }
    getAll() {
        return this.businessesService.getAll();
    }
    getMyBusinesses(auth) {
        const decoded = this.getUser(auth);
        return this.businessesService.getMyBusinesses(decoded.sub);
    }
    create(body, auth) {
        const decoded = this.getUser(auth);
        return this.businessesService.create(body, decoded.sub);
    }
    follow(id, auth) {
        const decoded = this.getUser(auth);
        return this.businessesService.toggleFollow(parseInt(id), decoded.sub);
    }
    delete(id, auth) {
        const decoded = this.getUser(auth);
        return this.businessesService.delete(parseInt(id), decoded.sub);
    }
};
exports.BusinessesController = BusinessesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BusinessesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusinessesController.prototype, "getMyBusinesses", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BusinessesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/follow'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BusinessesController.prototype, "follow", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BusinessesController.prototype, "delete", null);
exports.BusinessesController = BusinessesController = __decorate([
    (0, common_1.Controller)('businesses'),
    __metadata("design:paramtypes", [businesses_service_1.BusinessesService,
        jwt_1.JwtService])
], BusinessesController);
//# sourceMappingURL=businesses.controller.js.map