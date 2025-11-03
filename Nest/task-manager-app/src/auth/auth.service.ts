import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schemas/user.schema';
import { RegisterUserDto } from 'src/user/dto/register.dto';
import { LoginUserDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Register User
  async register(registerUserDto:RegisterUserDto) {
    const {name, email, password} = registerUserDto
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ name, email, password: hashedPassword });
    return { message: 'User registered successfully', user };
  }

  // Login User
  async login(loginUserDto:LoginUserDto) {
    const {email, password} = loginUserDto
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}
