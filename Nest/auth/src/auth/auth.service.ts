import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      user: newUser,
      message: 'User registered successfully',
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Sign up first');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    const { password: _, ...userData } = user.toObject();

    return {
      message: 'Logged in successfully',
      token,
      user: userData,
    };
  }
}
