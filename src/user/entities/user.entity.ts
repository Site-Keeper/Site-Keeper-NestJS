import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/entities/role.entity';
import { perssonelType } from 'src/enums/perssonel-type.enum';
import { Routine } from 'src/routine/entities/routine.entity';
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

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The document number of the user, must be unique',
    example: 123456789,
  })
  @Column({ unique: true })
  doc_number: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    nullable: true,
  })
  @Column({ nullable: true, unique: true })
  name: string;

  @ApiProperty({
    description: 'The email address of the user, must be unique',
    example: 'john.doe@example.com',
    nullable: true,
  })
  @Column({ nullable: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: '$2b$10$Vv6/FXgtv0SuF2cX/IYmQeS2yzFvTSc4ATzC54oV02r0w0C2L4Yy',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The role associated with the user',
    type: Role,
    example: {
      id: 1,
      name: 'Admin',
    },
  })
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ApiProperty({
    description: 'The personnel type of the user',
    enum: perssonelType,
    example: perssonelType.JANITORIAL,
    nullable: true,
  })
  @Column({ nullable: true })
  perssonel_type: perssonelType;

  @ApiProperty({
    description: 'Indicates if the user is deleted (soft delete)',
    example: false,
  })
  @Column({ default: false })
  is_deleted: boolean;

  @ApiProperty({
    description: 'The ID of the user who created this record',
    example: 1,
  })
  @Column()
  created_by: number;

  @ApiProperty({
    description: 'The ID of the user who last updated this record',
    example: 2,
  })
  @Column()
  updated_by: number;

  @ApiProperty({
    description: 'The date and time when the record was created',
    example: '2023-09-01T12:00:00Z',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    description: 'The date and time when the record was last updated',
    example: '2024-01-01T12:00:00Z',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Routine, (routine) =>  routine.assigned_to, {
  })
  routines: Routine[];

}
