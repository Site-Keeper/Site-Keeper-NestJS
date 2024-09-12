import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;
}
