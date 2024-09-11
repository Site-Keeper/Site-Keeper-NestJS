
import { Tasks } from 'src/task/entities/task.entity';
import { Users } from 'src/user/entities/user.entity';
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

@Entity()
export class Routines {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'jsonb', array: false, default: () => "'[]'" })
  days: string[];

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: Users;

  @Column()
  assigned_to: number;

  @Column()
  is_deleted: boolean;

  @OneToMany(() => Tasks, task => task.routine_id)
  tasks: Tasks[];

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
