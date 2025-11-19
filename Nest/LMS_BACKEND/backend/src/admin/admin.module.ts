import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Book, BookSchema } from '../books/schemas/book.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { BorrowRequest, BorrowRequestSchema } from '../borrow-requests/schemas/borrow-request.schema';
import { BorrowedBook, BorrowedBookSchema } from '../borrow-requests/schemas/borrowed-book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: User.name, schema: UserSchema },
      { name: BorrowRequest.name, schema: BorrowRequestSchema },
      { name: BorrowedBook.name, schema: BorrowedBookSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}