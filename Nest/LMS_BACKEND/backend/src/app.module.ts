import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { BorrowRequestsModule } from './borrow-requests/borrow-requests.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/library-management-system'),
    AuthModule,
    UsersModule,
    BooksModule,
    CartModule,
    BorrowRequestsModule,
    AdminModule,
  ],
})
export class AppModule {}