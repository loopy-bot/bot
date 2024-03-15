import { JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseClass/baseEntity';
import { Column } from 'src/common/decorators/createColumn';
import { App } from 'src/app/entities/app.entity';
import { Task } from 'src/task/entities/task.entity';

export class Room extends BaseEntity {
  @Column({ nullable: true, isRequired: true })
  topic: string;

  @Column({ isRequired: true })
  roomId: string;

  @Column({ isRequired: true })
  memberLength: number;

  @Column({ isRequired: true })
  appId: string;

  @ManyToMany(() => Task, (task) => task.friends)
  @JoinTable()
  tasks: Task[];
  // 设置多对一关系，每个用户关联到一个应用
  @ManyToOne(() => App, (app) => app.rooms)
  @JoinColumn() // 这会在 User 表中创建一个外键列
  app: App;
}
