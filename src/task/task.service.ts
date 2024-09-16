import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Topic } from 'src/entities/topic.entity';
import { RoutineService } from 'src/routine/routine.service';
import { Routine } from 'src/routine/entities/routine.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Routine)
    private RoutineRepository: Repository<Routine>,
  ) {}

  async create(createTaskDtoArray: CreateTaskDto[]) {
    try {
      const InvalidTask : Partial<Task>[] = []
      const tasks: Promise<Partial<Task>>[] = createTaskDtoArray.map(
        async (createTaskDto): Promise<Partial<Task>> => {
          const routine = await this.RoutineRepository.findOneBy(
            {id : createTaskDto.routine_id}
          );
          const topic = await this.topicRepository.findOneBy({
            id: createTaskDto.topic_id,
          });
          const task: Partial<Task> = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            state: createTaskDto.state,
            space_id: createTaskDto.space_id,
            object_id: createTaskDto.object_id,
            is_deleted: createTaskDto.is_deleted,
            routine,
            topic,
            created_by: 1,
            updated_by: 1,
          };
          console.log(routine)
          if (routine.assignedTo.perssonel_type !== topic.name) {
            delete task.routine;
            console.log('task', task)
            InvalidTask.push(task)
            return
          }
          return task;
        }
      );
      const tasksRes = await Promise.all(tasks);
      await this.tasksRepository.save(tasksRes);
      const tasksResponse = tasksRes.map((task) => {
        delete task.routine;
        return { ...task, routine: task.routine.id };
      });
      return {
        statusCode: 201,
        message: 'Task created successfully',
        data: {tasksResponse, InvalidTask},
      };
    } catch (error) {
      console.error('Error creating the tasks:', error);
      return {
        statusCode: 500,
        message: 'Error creating the tasks',
        error,
      };
    }
  }

  async findAll() {
    const tasks = await this.tasksRepository.find();
    return { stastusCode: 200, message: 'Get all Tasks', data: tasks };
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOneBy({ id });
    return { stastusCode: 200, message: 'Get Task by id', data: task };
  }

  async update(id: number, UpdateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.update(id, UpdateTaskDto);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
