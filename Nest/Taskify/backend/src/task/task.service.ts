import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schema/task.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = await this.taskModel.create({
      ...createTaskDto,
      createdBy: new Types.ObjectId(userId),
    });
  
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { tasks: task._id },
    });
    return task;
  }

  async findAll(userId: string) {
    const result = await this.taskModel.find({
      createdBy: new Types.ObjectId(userId),
    }).populate('createdBy', 'name email');;
    return result;
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).populate('createdBy', 'name email');;
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');

    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      { new: true },
    );

    if (updateTaskDto['createdBy']) {
      const newUserId = updateTaskDto['createdBy'];
      const oldUserId = task.createdBy.toString();

      await this.userModel.findByIdAndUpdate(oldUserId, {
        $pull: { tasks: task._id },
      });

      await this.userModel.findByIdAndUpdate(newUserId, {
        $push: { tasks: task._id },
      });
    }

    return updatedTask;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) throw new NotFoundException('Task not found');

    await this.userModel.findByIdAndUpdate(task.createdBy, {
      $pull: { tasks: task._id },
    });

    return { message: 'Task deleted successfully' };
  }
}
