export declare class UsersService {
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        avatar: string | null;
        bio: string | null;
        phone: string | null;
        website: string | null;
        gender: string | null;
        location: string | null;
        birthYear: string | null;
        ethnicity: string | null;
        createdAt: Date;
    } | null>;
    createUser(email: string, username: string, password: string): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        avatar: string | null;
        bio: string | null;
        phone: string | null;
        website: string | null;
        gender: string | null;
        location: string | null;
        birthYear: string | null;
        ethnicity: string | null;
        createdAt: Date;
    }>;
    getProfile(userId: number): Promise<{
        groupCount: number;
        connections: ({
            fromUser: {
                id: number;
                username: string;
                bio: string | null;
            };
            toUser: {
                id: number;
                username: string;
                bio: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            fromUserId: number;
            toUserId: number;
            status: string;
        })[];
        id?: number | undefined;
        email?: string | undefined;
        username?: string | undefined;
        avatar?: string | null | undefined;
        bio?: string | null | undefined;
        phone?: string | null | undefined;
        website?: string | null | undefined;
        gender?: string | null | undefined;
        location?: string | null | undefined;
        birthYear?: string | null | undefined;
        ethnicity?: string | null | undefined;
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
            visibility: string;
            authorId: number;
        })[] | undefined;
        _count?: {
            posts: number;
        } | undefined;
    }>;
    updateProfile(userId: number, data: {
        bio?: string;
        username?: string;
        phone?: string;
        website?: string;
        gender?: string;
        location?: string;
        birthYear?: string;
        ethnicity?: string;
        avatar?: string;
    }): Promise<{
        id: number;
        email: string;
        username: string;
        bio: string | null;
    }>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        avatar: string | null;
        bio: string | null;
        phone: string | null;
        website: string | null;
        gender: string | null;
        location: string | null;
        birthYear: string | null;
        ethnicity: string | null;
        createdAt: Date;
    }>;
}
