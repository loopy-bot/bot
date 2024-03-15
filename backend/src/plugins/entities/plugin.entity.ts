import { App } from 'src/app/entities/app.entity';
import { BaseEntity } from 'src/common/baseClass/baseEntity';
import { Column } from 'src/common/decorators/createColumn';
import { ManyToMany } from 'typeorm';
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
  params: Record<string, any>;

  @Column({ isRequired: true })
  response: {
    code: number;
    msg: string;
    data: Record<string, any>;
  };

  @ManyToMany(() => App)
  apps: App[];
}
