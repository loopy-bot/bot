import { BaseEntity } from '../../baseClass/baseEntity';
import { Entity } from 'typeorm';
import { Column } from '../../decorators/createColumn';

@Entity()
export class AliApp extends BaseEntity {
  @Column({ isRequired: true })
  appId: string;

  @Column({ isRequired: true })
  agentKey: string;

  @Column({ isRequired: true })
  name: string;

  @Column({ isRequired: false, nullable: true })
  description?: string;
}
