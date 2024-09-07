import { User } from "src/user/entities/user.entity";
import { Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role_id)
  users: User[];
}
