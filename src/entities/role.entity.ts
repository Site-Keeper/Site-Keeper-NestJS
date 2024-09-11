import { Users } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from './permission.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Users, (user) => user.role_id)
  users: Users[];

  @OneToMany(() => Permissions, (permission) => permission.role_id)
  permission: Permissions[]
}
