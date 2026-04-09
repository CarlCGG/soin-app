import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AIFactoryService } from './ai-factory.service';

@Module({
  controllers: [AiController],
  providers: [AiService, AIFactoryService],
  exports: [AiService, AIFactoryService],
})
export class AiModule {}