import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // ✅ Get user by ID
  async findById(userId: string) {
    try {
      const user = await this.userModel.findById(userId).select('-password');
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Something went wrong while fetching user',
      );
    }
  }

  // ✅ Update user details
  async update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) throw new NotFoundException('User not found');

      const { name, email, password } = updateUserDto;

      // 🧠 Optional: check if email already exists for another user
      if (email && email !== user.email) {
        const existingEmail = await this.userModel.findOne({ email });
        if (existingEmail)
          throw new BadRequestException('Email already in use');
        user.email = email;
      }

      if (name) user.name = name;

      // 🔒 Hash new password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();
      const {password:_, ...userObj} = updatedUser.toObject();
      

      return {
        message: 'Profile updated successfully',
        user: userObj,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error while updating user',
      );
    }
  }
}
