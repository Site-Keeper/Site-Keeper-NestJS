import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TaskService } from 'src/task/task.service';
import { UserJWT } from 'src/common/interfaces/jwt.interface';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private taskService: TaskService
  ) {}

  async create(createRoutineDto: CreateRoutineDto, userReq: UserJWT, token: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createRoutineDto.assigned_to, is_deleted: false },
      });
      const newRoutine = {
        name: createRoutineDto.name,
        start_time: createRoutineDto.start_time,
        end_time: createRoutineDto.end_time,
        days: createRoutineDto.days,
        assignedTo: user,
        is_deleted: createRoutineDto.is_deleted,
        created_by: userReq.id,
        updated_by: userReq.id,
      };
      await this.routineRepository.save(newRoutine);
      const task = await this.taskService.create(
        createRoutineDto.task,
        userReq, token
      );
      delete newRoutine.assignedTo;

      return {
        statusCode: 201,
        message: 'routine created successfully',
        data: {
          responseRoutine: { ...newRoutine, assignedTo: user.id },
          responseTask: { task },
        },
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
    const routines = await this.routineRepository.find({
      where: { is_deleted: false },
      relations: ['assignedTo']
    });
    const routineRespos = routines.map((routine) => {
      const name = routine.assignedTo.name
      delete routine.assignedTo
      return({...routine, assignedTo: name})
    })
    return  routineRespos ;
  }

  async findByUser(id: number) {
    try{
      const routines = await this.routineRepository.find({
        where: { is_deleted: false, assignedTo: { id } },
        relations: ['assignedTo']
      });
      const routineRespos = routines.map((routine) => {
        const name = routine.assignedTo.name
        delete routine.assignedTo
        return({...routine, assignedTo: name})
      })
      return  routineRespos ;
    } catch (error) {
      return error
    }
  }

  async findOne(id: number) {
    const routine = await this.routineRepository.findOne({
      where: { id, is_deleted: false },
    });
    return { stastusCode: 200, message: 'Get routines by id', data: routine };
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto, user: UserJWT) {
    const routine = await this.routineRepository.findOne({ where: { id } });
    const updateTask = { ...updateRoutineDto, updated_by: user.id };
    Object.assign(routine, updateTask);
    return await this.routineRepository.save(routine);
  }

  async remove(id: number, user: UserJWT, token: string) {
    try {
      await this.routineRepository.update(id, {
        updated_by: user.id,
        is_deleted: true,
      });

      const task = await this.taskService.findByRoutine(id, token);
      console.log(task);
      task.map((task) => {
        return this.taskService.remove(task.id, user);
      })
      return;
    } catch (error) {
      console.error('Error update the routine:', error);
      return {
        statusCode: 500,
        message: 'Error update the routine',
        error,
      };
    }
  }

  async restore(id: number, user: UserJWT) {
    try {
      await this.routineRepository.update(id, {
        updated_by: user.id,
        is_deleted: false,
      });
      return;
    } catch (error) {
      console.error('Error update the routine:', error);
      return {
        statusCode: 500,
        message: 'Error update the routine',
        error,
      };
    }
  }
}
