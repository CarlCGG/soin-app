import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}