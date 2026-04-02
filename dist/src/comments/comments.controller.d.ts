import { CommentsService } from './comments.service';
import { JwtService } from '@nestjs/jwt';
export declare class CommentsController {
    private commentsService;
    private jwtService;
    constructor(commentsService: CommentsService, jwtService: JwtService);
    getComments(postId: string): Promise<any>;
    createComment(auth: string, body: {
        postId: number;
        content: string;
    }): Promise<any>;
    deleteComment(auth: string, id: string): Promise<any>;
}
