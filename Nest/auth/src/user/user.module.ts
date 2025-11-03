import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, userSchema } from './schemas/user.schema';

@Module({
  imports:[
      MongooseModule.forFeature([{name:User.name, schema:userSchema}]),
      JwtModule.register({
        secret: process.env.JWT_SECRET, // use ENV variable in production
        signOptions: { expiresIn: '1d' },
      }),
    ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
