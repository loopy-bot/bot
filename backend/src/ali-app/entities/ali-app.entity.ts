import { BaseEntity } from '../../baseClass/baseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class AliApp extends BaseEntity {
  @Column()
  appId: string;
  @Column()
  agentKey: string;
  @Column()
  name: string;
  @Column()
  description: string;
}
