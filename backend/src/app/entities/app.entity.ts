import { BaseEntity } from '../../common/baseClass/baseEntity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Column } from '../../common/decorators/createColumn';
import { Friend } from 'src/wx-resource/entities/friend.entity';
import { Room } from 'src/wx-resource/entities/room.entity';
import { Plugin } from 'src/plugins/entities/plugin.entity';

@Entity()
export class App extends BaseEntity {
  @Column({ isRequired: true })
  name: string;

  @Column({ isRequired: false, nullable: true })
  description?: string;

  @Column({ isRequired: false, nullable: true })
  introduction?: string;

  @Column({ isRequired: false, nullable: true })
  model?: string;

  @OneToMany(() => Friend, (user) => user.app)
  friends: Friend[];

  @OneToMany(() => Room, (user) => user.app)
  rooms: Friend[];

  @ManyToMany(() => Plugin)
  @JoinTable()
  plugins: Plugin[];
}
