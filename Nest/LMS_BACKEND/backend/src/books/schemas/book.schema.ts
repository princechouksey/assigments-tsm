import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({ required: true })
  publicationYear: number;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0, default: 0 })
  totalCount: number;

  @Prop({ required: true, min: 0, default: 0 })
  availableCount: number;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true, min: 0, default: 10 })
  perDayCharge: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);