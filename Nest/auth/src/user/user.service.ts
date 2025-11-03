import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // 🧩 Fetch single user by ID
  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return {
      user,
      message: 'User fetched successfully',
    };
  }

  // 🧠 Update user data
  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
      select: '-password',
    });

    if (!updatedUser) throw new NotFoundException('User not found');

    return {
      user: updatedUser,
      message: 'User updated successfully',
    };
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).select('-password');
    if (!deletedUser) throw new NotFoundException('User not found');

    return {
      user: deletedUser,
      message: 'User deleted successfully',
    };
  }
}
