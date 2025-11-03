import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { TaskSchema } from './schema/task.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
  { name: Task.name, schema: TaskSchema },
  { name: User.name, schema: UserSchema },
])

  ],
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy],
})
export class TaskModule {}
