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
import { EventsModule } from './events/events.module';
import { SearchModule } from './search/search.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BusinessesModule } from './businesses/businesses.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ResourcesModule } from './resources/resources.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, MessagesModule, CommentsModule, GroupsModule, AiModule, EventsModule, SearchModule, NotificationsModule, BusinessesModule, AnalyticsModule, ResourcesModule, AssetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}