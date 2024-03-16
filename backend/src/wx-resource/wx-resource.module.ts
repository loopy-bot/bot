import { Module } from '@nestjs/common';
import { WxResourceService } from './wx-resource.service';
import { WxResourceController } from './wx-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Friend } from './entities/friend.entity';
import { Task } from 'src/task/entities/task.entity';
import { App } from 'src/app/entities/app.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Room, Friend, Task, App])],
  controllers: [WxResourceController],
  providers: [WxResourceService],
})
export class WxResourceModule {}
