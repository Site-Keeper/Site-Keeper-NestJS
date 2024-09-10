import { Status } from 'src/common/enums/status.enum';
import { Routine } from 'src/routine/entities/routine.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { User } from 'src/user/entities/user.entity';
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
}
