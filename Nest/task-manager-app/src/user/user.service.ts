import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password'); // hide password
  }

  // Find single user by ID
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Update user
  async update(id: string, updateData: any): Promise<User> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Delete user
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}
