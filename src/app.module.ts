import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MessagesModule } from './messages/messages.module';
import { CommentsModule } from './comments/comments.module';
import { GroupsModule } from './groups/groups.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, MessagesModule, CommentsModule, GroupsModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}