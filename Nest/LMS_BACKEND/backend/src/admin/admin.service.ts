import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../books/schemas/book.schema';
import { User } from '../users/schemas/user.schema';
import { BorrowRequest, BorrowRequestStatus } from '../borrow-requests/schemas/borrow-request.schema';
import { BorrowedBook, BorrowedBookStatus } from '../borrow-requests/schemas/borrowed-book.schema';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(BorrowRequest.name) private borrowRequestModel: Model<BorrowRequest>,
    @InjectModel(BorrowedBook.name) private borrowedBookModel: Model<BorrowedBook>,
  ) {}

  async getDashboardStats(): Promise<DashboardStatsDto> {
    const [
      totalBooks,
      availableBooks,
      totalUsers,
      totalBorrowRequests,
      pendingRequests,
      borrowedBooks,
      revenueData
    ] = await Promise.all([
      this.bookModel.countDocuments(),
      this.bookModel.aggregate([
        { $group: { _id: null, total: { $sum: '$availableCount' } } }
      ]),
      this.userModel.countDocuments({ role: 'user' }),
      this.borrowRequestModel.countDocuments(),
      this.borrowRequestModel.countDocuments({ status: BorrowRequestStatus.PENDING }),
      this.borrowedBookModel.countDocuments({ status: BorrowedBookStatus.BORROWED }),
      this.borrowRequestModel.aggregate([
        { $match: { status: BorrowRequestStatus.APPROVED } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    ]);

    return {
      totalBooks: totalBooks || 0,
      availableBooks: availableBooks[0]?.total || 0,
      borrowedBooks: borrowedBooks || 0,
      totalUsers: totalUsers || 0,
      totalBorrowRequests: totalBorrowRequests || 0,
      pendingRequests: pendingRequests || 0,
      totalRevenue: revenueData[0]?.total || 0,
    };
  }

  async getAllUsers() {
    return this.userModel.find({ role: 'user' }).select('-password').exec();
  }

  async getUserDetails(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    const borrowedBooks = await this.borrowedBookModel
      .find({ userId, status: BorrowedBookStatus.BORROWED })
      .populate('bookId')
      .exec();
    
    const borrowHistory = await this.borrowRequestModel
      .find({ userId })
      .populate('books.bookId')
      .exec();

    return {
      user,
      borrowedBooks,
      borrowHistory,
    };
  }
}