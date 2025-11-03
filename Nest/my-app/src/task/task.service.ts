import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: number;
  task: string;
  description: string;
  status: string;
}

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1; 

  create(createTaskDto: CreateTaskDto): Task {
    const { task, description, status } = createTaskDto;

    const newTask: Task = {
      id: this.nextId++, 
      task,
      description,
      status: status || TaskStatus.PENDING,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) throw new NotFoundException(`Task with ID ${id} not found`);

    this.tasks[index] = { ...this.tasks[index], ...updateTaskDto };
    return this.tasks[index];
  }

  remove(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) throw new NotFoundException(`Task with ID ${id} not found`);

    const deleted = this.tasks.splice(index, 1);
    return { message: `Task with ID ${id} deleted successfully`, deletedTask: deleted[0] };
  }
}
