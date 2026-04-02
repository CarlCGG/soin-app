export declare class ResourcesService {
    getAll(type?: string): Promise<any>;
    create(data: any, userId: number): Promise<any>;
    delete(resourceId: number, userId: number): Promise<any>;
}
