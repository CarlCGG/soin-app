export declare class EventsService {
    getAll(): Promise<any>;
    create(data: any, userId: number): Promise<any>;
    toggleAttend(eventId: number, userId: number): Promise<{
        attending: boolean;
    }>;
    delete(eventId: number): Promise<{
        success: boolean;
    }>;
}
