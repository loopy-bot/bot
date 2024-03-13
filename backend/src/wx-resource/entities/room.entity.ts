import { BaseEntity } from '../../baseClass/baseEntity';
import { Column } from 'src/decorators/createColumn';

export class Room extends BaseEntity {
  @Column({ nullable: true, isRequired: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ isRequired: true })
  wx_id: string;
}
