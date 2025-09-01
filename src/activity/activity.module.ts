import { Module } from '@midwayjs/core';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {} 