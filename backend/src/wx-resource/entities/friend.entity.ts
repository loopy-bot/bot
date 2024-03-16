import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseClass/baseEntity';
import { Column } from 'src/common/decorators/createColumn';
import { App } from 'src/app/entities/app.entity';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class Friend extends BaseEntity {
  @Column({ isRequired: true })
  friendId: string;

  @Column({ isRequired: true })
  name: string;

  @Column({ isRequired: true })
  alias: string;

  @ManyToMany(() => Task, (task) => task.friends)
  tasks: Task[];
  // 设置多对一关系，每个用户关联到一个应用
  @ManyToOne(() => App, (app) => app.friends)
  @JoinColumn() // 这会在 User 表中创建一个外键列
  app: App;
}
