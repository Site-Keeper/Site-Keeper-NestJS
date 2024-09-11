import { Roles } from 'src/entities/role.entity';
import { perssonelType } from 'src/enums/perssonel-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  doc_number: number;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Roles, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @Column()
  role_id: number;

  @Column({ nullable: true })
  perssonel_type: perssonelType;

  @Column({ default: false })
  is_deleted: boolean;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
