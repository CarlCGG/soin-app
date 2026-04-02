import { BusinessesService } from './businesses.service';
import { JwtService } from '@nestjs/jwt';
export declare class BusinessesController {
    private businessesService;
    private jwtService;
    constructor(businessesService: BusinessesService, jwtService: JwtService);
    private getUser;
    getAll(): Promise<any>;
    getMyBusinesses(auth: string): Promise<any>;
    create(body: any, auth: string): Promise<any>;
    follow(id: string, auth: string): Promise<{
        following: boolean;
    }>;
    delete(id: string, auth: string): Promise<{
        success: boolean;
    }>;
}
