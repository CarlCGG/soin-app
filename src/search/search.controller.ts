import { Controller, Get, Query, Headers } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtService } from '@nestjs/jwt';

@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService,
    private jwtService: JwtService,
  ) {}

  @Get()
  search(@Query('q') q: string, @Headers('authorization') auth?: string) {
    if (!q || q.trim() === '') return { users: [], posts: [], groups: [], events: [] };
    try {
      if (!auth) return this.searchService.search(q.trim());
      const token = auth.replace('Bearer ', '');
      const decoded = this.jwtService.verify(token, { secret: 'my_secret_key' });
      return this.searchService.search(q.trim(), decoded.sub);
    } catch {
      return this.searchService.search(q.trim());
    }
  }
}