import { Inject, Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private taskService: TaskService,
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
      await this.taskService.create(createRoutineDto.task)
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

  async findAll() {
    const routines = await this.routineRepository.find()
    return { stastusCode : 200, message : "Get all routines", data: routines};
  }

  async findOne(id: number) {
    const routine = await this.routineRepository.findOneBy({ id })
    return { stastusCode : 200, message : "Get routines by id", data: routine};
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return await this.routineRepository.update(id, updateRoutineDto);
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
