import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../schemas/task-status.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional() // Description can be empty
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional() // If not provided, our schema will use the default 'OPEN'
  status?: TaskStatus;
}