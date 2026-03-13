import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersController {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    getProfile(auth: string): Promise<{
        groupCount: number;
        id?: number | undefined;
        email?: string | undefined;
        username?: string | undefined;
        avatar?: string | null | undefined;
        bio?: string | null | undefined;
        createdAt?: Date | undefined;
        posts?: ({
            likes: {
                id: number;
                createdAt: Date;
                userId: number;
                postId: number;
            }[];
            _count: {
                comments: number;
            };
            author: {
                id: number;
                username: string;
            };
        } & {
            id: number;
            createdAt: Date;
            content: string;
            imageUrl: string | null;
            authorId: number;
        })[] | undefined;
        _count?: {
            posts: number;
        } | undefined;
    }>;
    updateProfile(auth: string, body: {
        bio: string;
    }): Promise<{
        id: number;
        email: string;
        username: string;
        bio: string | null;
    }>;
}
