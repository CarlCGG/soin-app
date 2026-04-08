import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // 1. 补上这个导入
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
import { ConnectionsModule } from './connections/connections.module';
import { SmartGoalsModule } from './smartgoals/smartgoals.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    UsersModule, 
    PostsModule, 
    MessagesModule, 
    CommentsModule, 
    GroupsModule, 
    AiModule, 
    EventsModule, 
    SearchModule, 
    NotificationsModule, 
    BusinessesModule, 
    AnalyticsModule, 
    ResourcesModule, 
    AssetsModule, 
    ConnectionsModule, 
    SmartGoalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}