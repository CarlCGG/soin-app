export declare class SearchService {
    search(query: string): Promise<{
        users: any;
        posts: any;
        groups: any;
        events: any;
    }>;
}
