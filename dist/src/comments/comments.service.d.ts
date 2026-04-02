export declare class CommentsService {
    createComment(postId: number, userId: number, content: string): Promise<any>;
    getComments(postId: number): Promise<any>;
    deleteComment(commentId: number, userId: number): Promise<any>;
}
