export declare class PostsService {
    createPost(userId: number, content: string, imageUrl?: string): Promise<{
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
    getAllPosts(): Promise<({
        likes: {
            id: number;
            createdAt: Date;
            postId: number;
            userId: number;
        }[];
        _count: {
            comments: number;
        };
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
    })[]>;
    likePost(postId: number, userId: number): Promise<{
        liked: boolean;
    }>;
    deletePost(postId: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        imageUrl: string | null;
        authorId: number;
    }>;
}
