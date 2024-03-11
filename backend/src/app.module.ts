import { mysqlConfig } from './../config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomModule } from './room/room.module';
import { TaskModule } from './task/task.module';
import { AliAppModule } from './ali-app/ali-app.module';

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
    RoomModule,
    TaskModule,
    AliAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
