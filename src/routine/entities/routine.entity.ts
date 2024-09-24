import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('routines')
export class Routine {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier for the routine',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Name of the routine',
    example: 'Morning Exercise',
  })
  name: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    description: 'Start time of the routine',
    example: '2024-09-12T06:00:00Z',
  })
  start_time: Date;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    description: 'End time of the routine',
    example: '2024-09-12T07:00:00Z',
  })
  end_time: Date;

  @Column({ type: 'jsonb', array: false, default: () => "'[]'" })
  @ApiProperty({
    description: 'Days of the week the routine is scheduled for',
    example: ['Monday', 'Wednesday', 'Friday'],
  })
  days: string[];

  @ManyToOne(() => User,{
    eager: true,
  })
  @JoinColumn({ name: 'assigned_to' })
  @ApiProperty({
    description: 'User assigned to this routine',
    type: User,
    example: 1,
  })
  assigned_to: User;

  @Column()
  @ApiProperty({
    description: 'Indicates whether the routine is deleted',
    example: false,
  })
  is_deleted: boolean;

  @OneToMany(() => Task, (task) => task.routine)
  tasks: Task[];

  @Column()
  @ApiProperty({
    description: 'ID of the user who created the routine',
    example: 1,
  })
  created_by: number;

  @Column()
  @ApiProperty({
    description: 'ID of the user who last updated the routine',
    example: 2,
  })
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Timestamp when the routine was created',
    example: '2024-09-12T08:00:00Z',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Timestamp when the routine was last updated',
    example: '2024-09-12T09:00:00Z',
  })
  updated_at: Date;
}
