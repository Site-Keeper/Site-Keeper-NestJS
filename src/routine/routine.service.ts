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
        assignedTo: user,
        is_deleted: createRoutineDto.is_deleted,
        created_by: userReq.id,
        updated_by: userReq.id,
      };
      const routine = await this.routineRepository.save(newRoutine);
      const tasks = createRoutineDto.task.map((task) => {
        return { ...task, routine_id: routine.id };
      });
      const task = await this.taskService.create(tasks, userReq, token);
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
      relations: ['assignedTo'],
    });
    const routineRespos = routines.map((routine) => {
      const name = routine.assignedTo.name;
      delete routine.assignedTo;
      return { ...routine, assignedTo: name };
    });
    return routineRespos;
  }

  async findByUser(id: number) {
    try {
      const routines = await this.routineRepository.find({
        where: { is_deleted: false, assignedTo: { id } },
        relations: ['assignedTo'],
      });
      const routineRespos = routines.map((routine) => {
        const name = routine.assignedTo.name;
        delete routine.assignedTo;
        return { ...routine, assignedTo: name };
      });
      return routineRespos;
    } catch (error) {
      return error;
    }
  }

  async findRoutinesForToday(user: UserJWT) {
    try {
      // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
      const currentDate = new Date();
      const dateISO = format(currentDate, 'yyyy-MM-dd');

      // Obtener el día de la semana en minúsculas (0: domingo, 1: lunes, ..., 6: sábado)
      const dayOfWeekNumber = getDay(currentDate); // getDay devuelve 0 para domingo
      const daysOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];
      const dayOfWeek = daysOfWeek[dayOfWeekNumber];

      // Construir la consulta
      const routines = await this.routineRepository
        .createQueryBuilder('routine')
        .leftJoinAndSelect('routine.assignedTo', 'user')
        .where('routine.is_deleted = :isDeleted', { isDeleted: false })
        .andWhere('user.id = :userId', { userId: user.id })
        .andWhere(':dayOfWeek = ANY (routine.days)', { dayOfWeek })
        .andWhere('routine.start_time <= :date AND routine.end_time >= :date', {
          date: dateISO,
        })
        .getMany();

      // Formatear la respuesta
      const routineResponses = routines.map((routine) => {
        const assignedToName = routine.assignedTo.name;
        delete routine.assignedTo;
        return { ...routine, assignedTo: assignedToName };
      });

      return {
        statusCode: 200,
        message: `Rutinas para el usuario ${user.id} en la fecha ${dateISO} obtenidas correctamente`,
        data: routineResponses,
      };
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
        relations: ['assignedTo'],
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
