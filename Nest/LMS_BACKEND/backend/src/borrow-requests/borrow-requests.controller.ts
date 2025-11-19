import { 
  Controller, Get, Post, Body, Param, Put, UseGuards, Query 
} from '@nestjs/common';
import { BorrowRequestsService } from './borrow-requests.service';
import { UpdateBorrowRequestDto } from './dto/update-borrow-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('borrow-requests')
@UseGuards(JwtAuthGuard)
export class BorrowRequestsController {
  constructor(private readonly borrowRequestsService: BorrowRequestsService) {}

  @Post('from-cart')
  async createFromCart(@GetUser() user: any) {
    return this.borrowRequestsService.createFromCart(user._id);
  }

  @Get()
  @Roles('admin')
  async findAll() {
    return this.borrowRequestsService.findAll();
  }

  @Get('my-requests')
  async findByUser(@GetUser() user: any) {
    return this.borrowRequestsService.findByUser(user._id);
  }

  @Get('my-borrowed-books')
  async getMyBorrowedBooks(@GetUser() user: any) {
    return this.borrowRequestsService.getUserBorrowedBooks(user._id);
  }

  @Get('my-borrow-history')
  async getMyBorrowHistory(@GetUser() user: any) {
    return this.borrowRequestsService.getUserBorrowHistory(user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.borrowRequestsService.findOne(id);
  }

  @Put(':id/approve')
  @Roles('admin')
  async approveRequest(
    @Param('id') id: string,
    @GetUser() user: any
  ) {
    return this.borrowRequestsService.approveRequest(id, user._id);
  }

  @Put(':id/reject')
  @Roles('admin')
  async rejectRequest(
    @Param('id') id: string,
    @GetUser() user: any,
    @Body() updateBorrowRequestDto: UpdateBorrowRequestDto
  ) {
    return this.borrowRequestsService.rejectRequest(
      id, 
      user._id, 
      updateBorrowRequestDto.rejectionReason
    );
  }

  @Put(':id/return')
  @Roles('admin')
  async returnBooks(@Param('id') id: string) {
    return this.borrowRequestsService.returnBooks(id);
  }
}