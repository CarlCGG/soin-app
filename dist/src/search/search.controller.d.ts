import { SearchService } from './search.service';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    search(q: string): Promise<{
        users: any;
        posts: any;
        groups: any;
        events: any;
    }> | {
        users: never[];
        posts: never[];
        groups: never[];
        events: never[];
    };
}
