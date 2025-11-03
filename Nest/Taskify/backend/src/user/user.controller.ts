import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Req,
  Res,
  Delete,
} from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    return this.userService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateProfile(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Res() res: Response) {
    res.setHeader('Authorization', '');

    return res.status(200).json({
      message: 'User logged out successfully',
    });
  }
}
