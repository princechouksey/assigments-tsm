import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { RegisterUserDto } from 'src/user/dto/register.dto';
import { LoginUserDto } from 'src/user/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('register')
register(@Body() registerUserDto: RegisterUserDto) {
  return this.authService.register(registerUserDto);
}

@Post('login')
login(@Body() loginUserDto: LoginUserDto) {
  return this.authService.login(loginUserDto);
}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return { message: 'You are authorized!' };
  }
}
