import axios from 'axios';
import { App } from 'src/app/entities/app.entity';
import { BaseEntity } from 'src/common/baseClass/baseEntity';
import { Column } from 'src/common/decorators/createColumn';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Plugin extends BaseEntity {
  @Column({ isRequired: true })
  name: string;
  @Column({ isRequired: true })
  type: string;
  @Column({ isRequired: false, nullable: true })
  description?: string;
  @Column({ isRequired: true })
  url: string;
  @Column({ isRequired: true })
  method: 'POST' | 'GET';

  @Column({ isRequired: true })
  responseType: 'json' | 'arraybuffer';

  @ManyToMany(() => App)
  apps: App[];

  async reply(text: string) {
    return axios({
      url: this.url,
      method: this.method,
      params: { text },
      headers: { responseType: this.responseType },
    });
  }
}
