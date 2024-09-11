import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./role.entity";

@Entity()
export class Permissions {
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

  @ManyToOne(() => Roles, role => role.permission )
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @Column()
  role_id: number
}
