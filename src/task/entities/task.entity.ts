import { Status } from 'src/common/enums/status.enum';
import { Routine } from 'src/routine/entities/routine.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Routine)
  @JoinColumn({ name: 'routine_id' })
  routine: Routine;

  @Column()
  routine_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  state: Status;

  @Column()
  space_id: number;

  @Column()
  object_id: number;

  @Column()
  is_deleted: boolean;
}
