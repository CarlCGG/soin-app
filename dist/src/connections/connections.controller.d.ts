import { ConnectionsService } from './connections.service';
import { JwtService } from '@nestjs/jwt';
export declare class ConnectionsController {
    private connectionsService;
    private jwtService;
    constructor(connectionsService: ConnectionsService, jwtService: JwtService);
    private getUser;
    sendRequest(auth: string, toUserId: string): Promise<any>;
    respond(auth: string, connectionId: string, body: {
        accept: boolean;
    }): Promise<any>;
    getConnections(auth: string): Promise<any>;
    getPending(auth: string): Promise<any>;
    getStatus(auth: string, toUserId: string): Promise<any>;
    removeConnection(auth: string, otherUserId: string): Promise<any>;
}
