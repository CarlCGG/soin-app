import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';
export declare class PostsController {
    private postsService;
    private jwtService;
    constructor(postsService: PostsService, jwtService: JwtService);
    getAllPosts(): Promise<any>;
    createPost(auth: string, body: {
        content: string;
        imageUrl?: string;
    }): Promise<any>;
    likePost(auth: string, id: string): Promise<{
        liked: boolean;
    }>;
    deletePost(auth: string, id: string): Promise<any>;
}
