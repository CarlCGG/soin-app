export declare class BusinessesService {
    getAll(): Promise<any>;
    getMyBusinesses(userId: number): Promise<any>;
    create(data: any, userId: number): Promise<any>;
    toggleFollow(businessId: number, userId: number): Promise<{
        following: boolean;
    }>;
    delete(businessId: number, userId: number): Promise<{
        success: boolean;
    }>;
}
