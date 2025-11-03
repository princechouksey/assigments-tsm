import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

export class CreateTaskDto {
  @IsString({ message: 'Task must be a string' })
  @MinLength(3, { message: "Task must be at least 3 characters long" })
  @Transform(({ value }) => value.trim())
  task: string;

  @IsString({ message: 'Description must be a string' })
  @MinLength(8, { message: "Description must be at least 8 characters long" })
  @Transform(({ value }) => value.trim())
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be either pending, in-progress, or done' })
  @Transform(({ value }) => value.trim())
  status?: string;
}
