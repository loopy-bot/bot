import { mysqlConfig } from './../config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from './task/task.module';
import { AliAppModule } from './ali-app/ali-app.module';
import { WxResourceModule } from './wx-resource/wx-resource.module';
import { PluginsModule } from './plugins/plugins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mysqlConfig,
      type: 'mysql',
      synchronize: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
      entities: [__dirname + '/**/entities/*.entity{.js,.ts}'],
    }),
    TaskModule,
    AliAppModule,
    WxResourceModule,
    PluginsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
