export declare class GroupsService {
    getAllGroups(): Promise<({
        members: {
            userId: number;
        }[];
        _count: {
            members: number;
        };
    } & {
        id: number;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
        createdAt: Date;
    })[]>;
    getGroupById(groupId: number): Promise<({
        members: ({
            user: {
                id: number;
                username: string;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            groupId: number;
            userId: number;
        })[];
        _count: {
            members: number;
        };
    } & {
        id: number;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
        createdAt: Date;
    }) | null>;
    createGroup(name: string, description: string, category: string, location: string, userId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
        createdAt: Date;
    }>;
    joinGroup(groupId: number, userId: number): Promise<{
        joined: boolean;
    }>;
    isMember(groupId: number, userId: number): Promise<{
        isMember: boolean;
    }>;
    getGroupMessages(groupId: number): Promise<({
        author: {
            id: number;
            username: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        groupId: number;
        content: string;
        authorId: number;
    })[]>;
    sendGroupMessage(groupId: number, userId: number, content: string): Promise<{
        author: {
            id: number;
            username: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        groupId: number;
        content: string;
        authorId: number;
    }>;
    deleteGroup(groupId: number, userId: number): Promise<{
        success: boolean;
    }>;
}
