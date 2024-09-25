import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/common/enums/status.enum';
import { Routine } from 'src/routine/entities/routine.entity';
import { Topic } from 'src/topic/entities/topic.entity';
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
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Task Title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Detailed description of the task' })
  @Column()
  description: string;

  @ApiProperty({ example: Status.PENDING })
  @Column()
  state: Status;

  @ApiProperty({ example: 123 })
  @Column()
  space_id: number;

  @ApiProperty({ example: 456, nullable: true })
  @Column({ nullable: true })
  object_id: number;

  @ApiProperty({ example: false })
  @Column()
  is_deleted: boolean;

  @ApiProperty({ type: () => Routine })
  @ManyToOne(() => Routine, (routine) => routine.tasks)
  @JoinColumn({ name: 'routine_id' })
  routine: Routine;

  @ApiProperty({ type: () => Topic, example: 1 })
  @ManyToOne(() => Topic, {
    eager: true,
  })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @ApiProperty({ example: 789 })
  @Column()
  created_by: number;

  @ApiProperty({ example: 789 })
  @Column()
  updated_by: number;

  @ApiProperty({ example: '2023-09-12T08:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ example: '2023-09-12T08:00:00.000Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
