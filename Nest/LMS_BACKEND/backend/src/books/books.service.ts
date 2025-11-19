import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const existingBook = await this.bookModel.findOne({ isbn: createBookDto.isbn });
    if (existingBook) {
      throw new ConflictException('Book with this ISBN already exists');
    }

    const book = new this.bookModel({
      ...createBookDto,
      availableCount: createBookDto.totalCount,
    });

    return book.save();
  }

  async findAll(search?: string): Promise<BookDocument[]> {
    if (search) {
      return this.bookModel.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { isbn: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ]
      }).exec();
    }
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async findByIsbn(isbn: string): Promise<BookDocument> {
    const book = await this.bookModel.findOne({ isbn }).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookDocument> {
    const book = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
    
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Book not found');
    }
  }

  async updateAvailableCount(bookId: string, change: number): Promise<BookDocument> {
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.availableCount += change;
    if (book.availableCount < 0) {
      throw new Error('Available count cannot be negative');
    }

    return book.save();
  }
}