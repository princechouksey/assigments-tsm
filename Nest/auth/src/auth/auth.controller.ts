import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from '../user/dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerUserDto:RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

 @Post('login')
  login(@Body() loginUserDto:LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
