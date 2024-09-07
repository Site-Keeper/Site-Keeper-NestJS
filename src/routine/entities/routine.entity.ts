import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Routine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'timestamp' })
    start_time: Date;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    user_id: number;

    @Column()
    is_deleted: boolean;
}
