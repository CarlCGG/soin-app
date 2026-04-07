import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: 'my_secret_key' }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}