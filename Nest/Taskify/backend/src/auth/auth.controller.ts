import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.authService.register(registerUserDto);
    return result;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const result = await this.authService.login(loginUserDto);

    // ✅ Correct method: res.set() instead of res.setHeaders()
    res.set('Authorization', `Bearer ${result.token}`);

    // ✅ You can also send the token in the response body for frontend access if needed
    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      token: result.token,
      user: result.user,
    });
  }
}
