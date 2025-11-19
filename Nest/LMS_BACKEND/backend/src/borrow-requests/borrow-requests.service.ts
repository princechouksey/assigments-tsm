import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BorrowRequest, BorrowRequestDocument, BorrowRequestStatus } from './schemas/borrow-request.schema';
import { BorrowedBook, BorrowedBookDocument, BorrowedBookStatus } from './schemas/borrowed-book.schema';
import { CartService } from '../cart/cart.service';
import { BooksService } from '../books/books.service';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';

@Injectable()
export class BorrowRequestsService {
  constructor(
    @InjectModel(BorrowRequest.name) private borrowRequestModel: Model<BorrowRequestDocument>,
    @InjectModel(BorrowedBook.name) private borrowedBookModel: Model<BorrowedBookDocument>,
    private cartService: CartService,
    private booksService: BooksService,
  ) {}

  async createFromCart(userId: string): Promise<BorrowRequestDocument> {
    const cart = await this.cartService.getCart(userId);
    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    let totalAmount = 0;
    const booksWithDetails: Array<{
      bookId: string;
      quantity: number;
      duration: number;
      perDayCharge: number;
    }> = [];

    for (const item of cart.items) {
      const bookId = typeof item.bookId === 'object' && item.bookId !== null
        ? (item.bookId as any)._id || (item.bookId as any).id
        : item.bookId;
      const book = await this.booksService.findOne(bookId.toString());
      
      if (book.availableCount < item.quantity) {
        throw new BadRequestException(`Not enough copies available for ${book.title}`);
      }

      const itemTotal = book.perDayCharge * item.duration * item.quantity;
      totalAmount += itemTotal;

      booksWithDetails.push({
        bookId: bookId.toString(),
        quantity: item.quantity,
        duration: item.duration,
        perDayCharge: book.perDayCharge,
      });
    }

    const borrowRequest = new this.borrowRequestModel({
      userId: new Types.ObjectId(userId),
      books: booksWithDetails,
      totalAmount,
      requestDate: new Date(),
    });

    await this.cartService.clearCart(userId);
    return borrowRequest.save();
  }

  async findAll(): Promise<BorrowRequestDocument[]> {
    return this.borrowRequestModel
      .find()
      .populate('userId', 'name email')
      .populate('books.bookId')
      .populate('approvedBy', 'name')
      .exec();
  }

  async findByUser(userId: string): Promise<BorrowRequestDocument[]> {
    return this.borrowRequestModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('books.bookId')
      .populate('approvedBy', 'name')
      .exec();
  }

  async findOne(id: string): Promise<BorrowRequestDocument> {
    const request = await this.borrowRequestModel
      .findById(id)
      .populate('userId', 'name email')
      .populate('books.bookId')
      .populate('approvedBy', 'name')
      .exec();

    if (!request) {
      throw new NotFoundException('Borrow request not found');
    }
    return request;
  }

  async approveRequest(requestId: string, adminId: string): Promise<BorrowRequestDocument> {
    const request = await this.borrowRequestModel.findById(requestId);
    
    if (!request) {
      throw new NotFoundException('Borrow request not found');
    }

    if (request.status !== BorrowRequestStatus.PENDING) {
      throw new BadRequestException('Request is not pending');
    }

    for (const item of request.books) {
      const book = await this.booksService.findOne(item.bookId?.toString());
      
      if (book.availableCount < item.quantity) {
        throw new BadRequestException(`Not enough copies available for ${book.title}`);
      }

  await this.booksService.updateAvailableCount((book as any)._id.toString(), -item.quantity);

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + item.duration);

      const borrowedBook = new this.borrowedBookModel({
        userId: request.userId,
        bookId: item.bookId,
        borrowRequestId: request._id,
        borrowDate: new Date(),
        dueDate,
        quantity: item.quantity,
        status: BorrowedBookStatus.BORROWED,
      });

      await borrowedBook.save();
    }

    request.status = BorrowRequestStatus.APPROVED;
    request.approvedBy = new Types.ObjectId(adminId);
    request.approvedDate = new Date();

    return request.save();
  }

  async rejectRequest(requestId: string, adminId: string, reason?: string): Promise<BorrowRequestDocument> {
    const request = await this.borrowRequestModel.findById(requestId);
    
    if (!request) {
      throw new NotFoundException('Borrow request not found');
    }

    if (request.status !== BorrowRequestStatus.PENDING) {
      throw new BadRequestException('Request is not pending');
    }

    request.status = BorrowRequestStatus.REJECTED;
    request.approvedBy = new Types.ObjectId(adminId);
  if (reason) request.rejectionReason = reason;

    return request.save();
  }

  async returnBooks(requestId: string): Promise<BorrowRequestDocument> {
    const request = await this.borrowRequestModel.findById(requestId);
    
    if (!request) {
      throw new NotFoundException('Borrow request not found');
    }

    if (request.status !== BorrowRequestStatus.APPROVED) {
      throw new BadRequestException('Request is not approved');
    }

    const borrowedBooks = await this.borrowedBookModel.find({ 
      borrowRequestId: new Types.ObjectId(requestId),
      status: BorrowedBookStatus.BORROWED
    });

    for (const borrowedBook of borrowedBooks) {
      await this.booksService.updateAvailableCount(
        borrowedBook.bookId.toString(), 
        (borrowedBook as any).quantity || 1
      );

      borrowedBook.status = BorrowedBookStatus.RETURNED;
      borrowedBook.returnDate = new Date();
      await borrowedBook.save();
    }

    request.status = BorrowRequestStatus.RETURNED;
    request.returnedDate = new Date();

    return request.save();
  }

  async getUserBorrowedBooks(userId: string): Promise<BorrowedBookDocument[]> {
    return this.borrowedBookModel
      .find({ 
        userId: new Types.ObjectId(userId),
        status: BorrowedBookStatus.BORROWED
      })
      .populate('bookId')
      .exec();
  }

  async getUserBorrowHistory(userId: string): Promise<BorrowedBookDocument[]> {
    return this.borrowedBookModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('bookId')
      .populate('borrowRequestId')
      .exec();
  }
}