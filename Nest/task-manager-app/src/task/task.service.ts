import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async findAllTasks(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }
  async remove(id: string): Promise<{message : string}> {
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Task not found');
    return {message:"Task Deleted Successfully"}
  }
}

