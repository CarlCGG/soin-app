import { GroupsService } from './groups.service';
import { JwtService } from '@nestjs/jwt';
export declare class GroupsController {
    private groupsService;
    private jwtService;
    constructor(groupsService: GroupsService, jwtService: JwtService);
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
    getGroupById(id: string): Promise<({
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
    createGroup(auth: string, body: {
        name: string;
        description: string;
        category: string;
        location: string;
    }): Promise<{
        id: number;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
        createdAt: Date;
    }>;
    joinGroup(auth: string, id: string): Promise<{
        joined: boolean;
    }>;
    getGroupMessages(id: string): Promise<({
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
    sendGroupMessage(auth: string, id: string, body: {
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
        groupId: number;
        content: string;
        authorId: number;
    }>;
    deleteGroup(id: string, auth: string): Promise<{
        success: boolean;
    }>;
}
