import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}