import { GroupsService } from './groups.service';
import { JwtService } from '@nestjs/jwt';
export declare class GroupsController {
    private groupsService;
    private jwtService;
    constructor(groupsService: GroupsService, jwtService: JwtService);
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
    getGroupById(id: string): Promise<({
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
    createGroup(auth: string, body: {
        name: string;
        description: string;
        category: string;
        location: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        category: string | null;
        location: string | null;
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
        content: string;
        authorId: number;
        groupId: number;
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
        content: string;
        authorId: number;
        groupId: number;
    }>;
    deleteGroup(id: string, auth: string): Promise<{
        success: boolean;
    }>;
}
