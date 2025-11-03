import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
