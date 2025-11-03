import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // ✅ Create new task and associate with logged-in user
  @Post('create')
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.taskService.create(createTaskDto, req.user.userId);
  }

  
  @Get('getall')
  async findAll(@Req() req: any) {
    return this.taskService.findAll(req.user.userId)
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.taskService.remove(id);
  }
}
