export declare class CommentsService {
    createComment(postId: number, userId: number, content: string): Promise<{
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
    getComments(postId: number): Promise<({
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
    deleteComment(commentId: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
}
