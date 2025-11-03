import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 50, { message: 'Title must be between 3 and 50 characters long' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Length(0, 200, { message: 'Description cannot exceed 200 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of: PENDING, IN_PROGRESS, COMPLETED',
  })
  status?: TaskStatus;
 @IsString()
 @IsOptional()
  user:string;
  @IsOptional()
  @IsString({ message: 'CreatedBy must be a string' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'CreatedBy can only contain letters, numbers, underscores, or hyphens',
  })
  createdBy?: string;
}
