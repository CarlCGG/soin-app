import { ResourcesService } from './resources.service';
import { JwtService } from '@nestjs/jwt';
export declare class ResourcesController {
    private resourcesService;
    private jwtService;
    constructor(resourcesService: ResourcesService, jwtService: JwtService);
    private getUser;
    getAll(type?: string): Promise<any>;
    create(body: any, auth: string): Promise<any>;
    delete(id: string, auth: string): Promise<any>;
}
