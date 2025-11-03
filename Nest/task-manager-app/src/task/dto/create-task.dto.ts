import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export  enum TaskStatus{
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
export class CreateTaskDto {
    @IsString({message: "The title must be string"})
    @IsNotEmpty({message:"Title must not be empty"})
    title:string;

    @IsString({message: "The title must be string"})
    @IsNotEmpty({message:"Title must not be empty"})
    @MinLength(3, {message:"Description must be minimum of length 3"})
    description:string;

    @IsEnum(TaskStatus,{
        message:'Status must be one of: pending, in_progress, completed',
    } )
    @IsOptional()
    status?:TaskStatus = TaskStatus.PENDING

}
