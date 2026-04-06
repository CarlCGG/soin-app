import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  search(@Query('q') q: string) {
    if (!q || q.trim() === '') return { users: [], posts: [], groups: [], events: [] };
    return this.searchService.search(q.trim());
  }
}