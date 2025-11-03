import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/user.schema';
import { LoginUserDto, RegisterUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const { name, email, password } = registerUserDto;

      const existingUser = await this.userModel.findOne({ email });
      if (existingUser)
        throw new BadRequestException('User already exists, please login');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        task: [],
      });

      const { password: _, ...userObj } = newUser.toObject(); // ✅ remove password cleanly

      return {
        message: 'User registered successfully',
        user: userObj,
        
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Something went wrong during registration',
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userModel.findOne({ email });
      if (!user)
        throw new UnauthorizedException('User not found, please register first');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        throw new BadRequestException('Incorrect email or password');

      const payload = { id: user._id, email: user.email };
      const token = this.jwtService.sign(payload);

      const { password: _, ...userObj } = user.toObject(); // ✅ remove password before returning

      return {
        message: 'Logged in successfully',
        user: userObj,
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Something went wrong during login',
      );
    }
  }
}
