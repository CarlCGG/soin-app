import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [ResourcesService],
  controllers: [ResourcesController],
})
export class ResourcesModule {}