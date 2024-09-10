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

  @Column({ nullable: true })
  object_id: number;

  @Column()
  is_deleted: boolean;

  @ManyToOne(() => User )
  @JoinColumn({ name: 'assigned_to'})
  assigned_to: User;

  @ManyToOne(() => User )
  @JoinColumn({ name: 'created_by'})
  created_by: User;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic_id: Topic;
}
