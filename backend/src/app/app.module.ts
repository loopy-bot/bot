import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { Plugin } from 'src/plugins/entities/plugin.entity';
import { Friend } from 'src/wx-resource/entities/friend.entity';
import { Room } from 'src/wx-resource/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([App, Plugin, Friend, Room])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
