export declare class GroupsService {
    getAllGroups(): Promise<({
        _count: {
            members: number;
        };
    } & {
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
    })[]>;
    getGroupById(groupId: number): Promise<({
        _count: {
            members: number;
        };
        members: ({
            user: {
                id: number;
                username: string;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            groupId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
    }) | null>;
    createGroup(name: string, description: string, category: string, location: string, userId: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
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
        content: string;
        authorId: number;
        groupId: number;
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
        content: string;
        authorId: number;
        groupId: number;
    }>;
    deleteGroup(groupId: number, userId: number): Promise<{
        success: boolean;
    }>;
}
