import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import { User } from '../user/entities/user.entity';
import { Activity } from '../activity/entities/activity.entity';
import { ActivityRegistration } from '../activity/entities/activity-registration.entity';
import { ActivityComment } from '../activity/entities/activity-comment.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1751442869058_7287',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: join(__dirname, '../../data.sqlite'),
        synchronize: true,
        logging: false,
        entities: [User, Activity, ActivityRegistration, ActivityComment],
      },
    },
  },
} as MidwayConfig;
