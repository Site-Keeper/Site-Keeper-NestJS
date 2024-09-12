import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createRoutineDto: CreateRoutineDto) {
    try {
      const user = await this.userRepository.findOneBy({
        id: createRoutineDto.assigned_to,
      });
      const newRoutine = {
        name: createRoutineDto.name,
        start_time: createRoutineDto.start_time,
        end_time: createRoutineDto.end_time,
        days: createRoutineDto.days,
        assignedTo: user,
        is_deleted: createRoutineDto.is_deleted,
        created_by: 1,
        updated_by: 1,
      };
      await this.routineRepository.save(newRoutine);

      delete newRoutine.assignedTo;

      return {
        statusCode: 201,
        message: 'routine created successfully',
        data: { ...newRoutine, assignedTo: user.id },
      };
    } catch (error) {
      console.error('Error creating the routine:', error);
      return {
        statusCode: 500,
        message: 'Error creating the routine',
        error,
      };
    }
  }

  findAll() {
    return `This action returns all routine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return await this.routineRepository.update(id, updateRoutineDto);
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
