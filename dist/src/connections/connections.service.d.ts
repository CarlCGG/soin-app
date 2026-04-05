export declare class ConnectionsService {
    sendRequest(fromUserId: number, toUserId: number): Promise<any>;
    respondRequest(connectionId: number, userId: number, accept: boolean): Promise<any>;
    getConnections(userId: number): Promise<any>;
    getPendingRequests(userId: number): Promise<any>;
    getConnectionStatus(fromUserId: number, toUserId: number): Promise<any>;
    removeConnection(userId: number, otherUserId: number): Promise<any>;
}
