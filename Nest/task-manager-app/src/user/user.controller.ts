import { Controller, Get, Param, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  update(@Param('id') id: string, @Body() UpdateUserDto ) {
    return this.userService.update(id, UpdateUserDto);
  }

  // Delete user
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
