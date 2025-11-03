import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import { TaskStatus } from "./dto/create-task.dto";

@Schema({timestamps:true})
export class Task extends Document{
    @Prop({required:true})
    title:string;

    @Prop({required:true})
    description:string;

    @Prop({
        type:String,
        enum:Object.values(TaskStatus),
        default:TaskStatus.PENDING
    })
    status:TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task);
