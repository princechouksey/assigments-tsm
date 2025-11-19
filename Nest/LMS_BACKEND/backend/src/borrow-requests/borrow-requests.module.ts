import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowRequestsService } from './borrow-requests.service';
import { BorrowRequestsController } from './borrow-requests.controller';
import { BorrowRequest, BorrowRequestSchema } from './schemas/borrow-request.schema';
import { BorrowedBook, BorrowedBookSchema } from './schemas/borrowed-book.schema';
import { CartModule } from '../cart/cart.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BorrowRequest.name, schema: BorrowRequestSchema },
      { name: BorrowedBook.name, schema: BorrowedBookSchema },
    ]),
    CartModule,
    BooksModule,
  ],
  controllers: [BorrowRequestsController],
  providers: [BorrowRequestsService],
  exports: [BorrowRequestsService],
})
export class BorrowRequestsModule {}