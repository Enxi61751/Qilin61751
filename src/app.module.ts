import { App, Configuration } from '@midwayjs/core';
import { join } from 'path';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as typeorm from '@midwayjs/typeorm';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';

@Configuration({
  imports: [
    koa,
    validate,
    typeorm,
    UserModule,
    ActivityModule,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
  }
}