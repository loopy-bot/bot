import { BaseEntity } from '../../common/baseClass/baseEntity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Column } from '../../common/decorators/createColumn';
import { Friend } from 'src/wx-resource/entities/friend.entity';
import { Room } from 'src/wx-resource/entities/room.entity';
import { Plugin } from 'src/plugins/entities/plugin.entity';

import { Qwen } from 'src/common/model/qwen';

@Entity()
export class App extends BaseEntity {
  constructor() {
    super();
    this.model = new Qwen(this.personality);
  }
  model?: Qwen;

  @Column({ isRequired: true })
  name: string;

  @Column({ isRequired: false, nullable: true })
  description?: string;

  @Column({ isRequired: false, nullable: true })
  personality?: string;

  @OneToMany(() => Friend, (user) => user.app)
  friends: Friend[];

  @OneToMany(() => Room, (user) => user.app)
  rooms: Room[];

  @ManyToMany(() => Plugin)
  @JoinTable()
  plugins: Plugin[];

  async getIntent(text: string) {
    const pluginTypes = this.plugins.map((i) => i.type);

    const intentType = await this.model.genarate(
      `请你根据用户问题推测用户意图，意图是固定的，只有如下几个：${pluginTypes}，如果用户意图属于这其中一个。那就把这个值单独返回出来，否则就返回null。问题如下：${text}`,
    );
    return intentType;
  }

  async reply(id: string, text: string) {
    const intent = await this.getIntent(text);
    const plugin = this.plugins.find((i) => i.type === intent);
    if (plugin) {
      return plugin.reply(text);
    } else {
      return new Promise((res, rej) => {
        this.model.chat(id, text, res);
      });
    }
  }
}
