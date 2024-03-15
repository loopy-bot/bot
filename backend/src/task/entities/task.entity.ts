import { BaseEntity } from '../../common/baseClass/baseEntity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Column } from '../../common/decorators/createColumn';
import { Friend } from 'src/wx-resource/entities/friend.entity';
import { Room } from 'src/wx-resource/entities/room.entity';
import { Plugin } from 'src/plugins/entities/plugin.entity';

@Entity()
export class Task extends BaseEntity {
  @Column({ isRequired: true })
  name: string;

  @Column({ isRequired: true })
  time?: number;

  @Column({ isRequired: false, nullable: true })
  description?: string;

  @Column({ isRequired: true })
  text?: string;

  @Column({ isRequired: false, nullable: true })
  count?: number;

  @ManyToMany(() => Friend, (friend) => friend.tasks)
  friends: Friend[];

  @ManyToMany(() => Room, (room) => room.tasks)
  rooms: Room[];
}
