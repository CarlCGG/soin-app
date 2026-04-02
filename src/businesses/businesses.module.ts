import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [BusinessesService],
  controllers: [BusinessesController],
})
export class BusinessesModule {}