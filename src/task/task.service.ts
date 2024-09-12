import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Routine } from 'src/routine/entities/routine.entity';
import { Topic } from 'src/entities/topic.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const routine = await this.routineRepository.findOneBy({
        id: createTaskDto.routine_id,
      });
      const topic = await this.topicRepository.findOneBy({
        id: createTaskDto.topic_id,
      });
      const newTask = {
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
      await this.tasksRepository.save(newTask);

      delete newTask.routine;

      return {
        statusCode: 201,
        message: 'Task created successfully',
        data: { ...newTask, routine: routine.id },
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

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, UpdateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.update(id, UpdateTaskDto);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
