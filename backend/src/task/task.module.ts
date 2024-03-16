import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/wx-resource/entities/room.entity';
import { Friend } from 'src/wx-resource/entities/friend.entity';
import { Task } from './entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Room, Friend, Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
