import { Module } from '@nestjs/common';
import { SmartGoalsController } from './smartgoals.controller';
import { SmartGoalsService } from './smartgoals.service';


@Module({
  controllers: [SmartGoalsController],
  providers: [SmartGoalsService], 
})
export class SmartGoalsModule {}