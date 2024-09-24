import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TaskService } from 'src/task/task.service';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { format, getDay } from 'date-fns';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private taskService: TaskService
  ) {}

  async create(
    createRoutineDto: CreateRoutineDto,
    userReq: UserJWT,
    token: string
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createRoutineDto.assigned_to, is_deleted: false },
      });
      const newRoutine = {
        name: createRoutineDto.name,
        start_time: createRoutineDto.start_time,
        end_time: createRoutineDto.end_time,
        days: createRoutineDto.days,
        assigned_to: user,
        is_deleted: createRoutineDto.is_deleted,
        created_by: userReq.id,
        updated_by: userReq.id,
      };
      const routine = await this.routineRepository.save(newRoutine);
      const tasks = createRoutineDto.task.map((task) => {
        return { ...task, routine_id: routine.id };
      });
      const task = await this.taskService.create(tasks, userReq, token);
      delete newRoutine.assigned_to;
      return {
        statusCode: 201,
        message: 'routine created successfully',
        data: {
          responseRoutine: { ...newRoutine, assigned_to: user.id },
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
    try{
      const routines = await this.routineRepository.find({
        where: { is_deleted: false },
        relations: { assigned_to: true},
      });
      const routineRespos = routines.map((routine) => {
        const name = routine.assigned_to.name;
        console.log(name)
        delete routine.assigned_to;
        return { ...routine, assigned_to: name };
      });
      return routineRespos;
    } catch (error){
      console.error(error)
      return error
    }
  }

  async findByUser(id: number) {
    try {
      const routines = await this.routineRepository.find({
        where: { is_deleted: false, assigned_to: { id } },
        relations: ['assigned_to'],
      });
      const routineRespos = routines.map((routine) => {
        const name = routine.assigned_to.name;
        delete routine.assigned_to;
        return { ...routine, assigned_to: name };
      });
      return routineRespos;
    } catch (error) {
      return error;
    }
  }

  async findRoutinesForToday(id: number) {
    try {
      const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
      const routines = await this.routineRepository.find({
        where: { is_deleted: false, assigned_to: { id } },
        relations: ['assigned_to'],
      }); 
      console.log(routines, id)
      const todayRoutines = routines.find(routine => routine.days.includes(today));
      return {todayRoutines};
    } catch (error) {
      console.error('Error al obtener rutinas para hoy:', error);
      throw new InternalServerErrorException(
        'Error al obtener rutinas para hoy'
      );
    }
  }

  async findOne(id: number) {
    try {
      const routine = await this.routineRepository.findOne({
        where: { id, is_deleted: false },
        relations: ['assigned_to'],
      });
      return routine;
    } catch (error) {
      return error;
    }
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
      });
      return;
    } catch (error) {
      console.error('Error update the routine:', error);
      throw new InternalServerErrorException('Error updating the routine');
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
      throw new InternalServerErrorException('Error update the routine');
    }
  }
}
