import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
    AiModule,
  ],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}