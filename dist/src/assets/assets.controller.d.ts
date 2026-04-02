import { AssetsService } from './assets.service';
import { JwtService } from '@nestjs/jwt';
export declare class AssetsController {
    private assetsService;
    private jwtService;
    constructor(assetsService: AssetsService, jwtService: JwtService);
    private getUser;
    getAll(type?: string): Promise<any>;
    getMy(auth: string): Promise<any>;
    create(body: any, auth: string): Promise<any>;
    delete(id: string, auth: string): Promise<any>;
}
