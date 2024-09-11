import { Status } from 'src/common/enums/status.enum';
import { Topic } from 'src/entities/topic.entity';
import { Routine } from 'src/routine/entities/routine.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  state: Status;

  @Column()
  space_id: number;

  @Column({ nullable: true })
  object_id: number;

  @Column()
  is_deleted: boolean;

  @ManyToOne(() => Routine, routine => routine.tasks)
  @JoinColumn({ name: 'routine_id' })
  routine: Routine;

  @Column()
  routine_id: number;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column()
  topic_id: number;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
