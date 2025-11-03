import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskStatus } from './task-status.enum';

// This line is for TypeScript to know the type of a hydrated document
export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt timestamps
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: TaskStatus.OPEN })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);