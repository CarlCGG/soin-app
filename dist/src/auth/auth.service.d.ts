import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(email: string, username: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
}
