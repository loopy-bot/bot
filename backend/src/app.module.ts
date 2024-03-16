import { mysqlConfig } from './../config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from './task/task.module';
import { AppModule as App } from './app/app.module';
import { WxResourceModule } from './wx-resource/wx-resource.module';
import { PluginsModule } from './plugins/plugins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mysqlConfig,
      type: 'mysql',
      synchronize: true,
      poolSize: 10,
      logging: true,
      connectorPackage: 'mysql2',
      entities: [__dirname + '/**/entities/*.entity{.js,.ts}'],
    }),

    App,
    PluginsModule,
    TaskModule,
    WxResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
