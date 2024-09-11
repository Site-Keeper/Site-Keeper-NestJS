import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string;

  @Column()
  can_create: boolean

  @Column()
  can_read: boolean

  @Column()
  can_update: boolean

  @Column()
  can_delete: boolean

  @ManyToOne(() => Role, role => role.permission )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  role_id: number
}
