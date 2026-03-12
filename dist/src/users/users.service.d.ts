export declare class UsersService {
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
    } | null>;
    createUser(email: string, username: string, password: string): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
    }>;
}
