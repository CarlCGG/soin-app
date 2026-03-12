import { CommentsService } from './comments.service';
import { JwtService } from '@nestjs/jwt';
export declare class CommentsController {
    private commentsService;
    private jwtService;
    constructor(commentsService: CommentsService, jwtService: JwtService);
    getComments(postId: string): Promise<({
        author: {
            id: number;
            username: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        authorId: number;
        postId: number;
    })[]>;
    createComment(auth: string, body: {
        postId: number;
        content: string;
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
        authorId: number;
        postId: number;
    }>;
    deleteComment(auth: string, id: string): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
}
