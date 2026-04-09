import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
    AiModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}