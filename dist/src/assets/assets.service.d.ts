export declare class AssetsService {
    getAll(type?: string): Promise<any>;
    getMy(userId: number): Promise<any>;
    create(data: any, userId: number): Promise<any>;
    delete(assetId: number, userId: number): Promise<any>;
}
