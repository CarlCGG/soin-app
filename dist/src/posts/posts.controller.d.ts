import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';
export declare class PostsController {
    private postsService;
    private jwtService;
    constructor(postsService: PostsService, jwtService: JwtService);
    getAllPosts(): Promise<({
        likes: {
            id: number;
            createdAt: Date;
            postId: number;
            userId: number;
        }[];
        author: {
            id: number;
            username: string;
            avatar: string | null;
        };
        _count: {
            comments: number;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        imageUrl: string | null;
        authorId: number;
    })[]>;
    createPost(auth: string, body: {
        content: string;
        imageUrl?: string;
    }): Promise<{
        author: {
            id: number;
            username: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        imageUrl: string | null;
        authorId: number;
    }>;
    likePost(auth: string, id: string): Promise<{
        liked: boolean;
    }>;
    deletePost(auth: string, id: string): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        imageUrl: string | null;
        authorId: number;
    }>;
}
