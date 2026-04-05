export declare class PostsService {
    createPost(userId: number, content: string, imageUrl?: string, visibility?: string): Promise<any>;
    getAllPosts(): Promise<any>;
    likePost(postId: number, userId: number): Promise<{
        liked: boolean;
    }>;
    deletePost(postId: number, userId: number): Promise<any>;
}
