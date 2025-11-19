import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BorrowedBookDocument = BorrowedBook & Document;

export enum BorrowedBookStatus {
  BORROWED = 'borrowed',
  RETURNED = 'returned',
  OVERDUE = 'overdue'
}

@Schema({ timestamps: true })
export class BorrowedBook {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'BorrowRequest', required: true })
  borrowRequestId: Types.ObjectId;

  @Prop({ required: true })
  borrowDate: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: 1 })
  quantity: number;

  @Prop()
  returnDate: Date;

  @Prop({ required: true, enum: BorrowedBookStatus, default: BorrowedBookStatus.BORROWED })
  status: BorrowedBookStatus;

  @Prop({ default: 0 })
  fineAmount: number;

  @Prop({ default: false })
  finePaid: boolean;
}

export const BorrowedBookSchema = SchemaFactory.createForClass(BorrowedBook);

BorrowedBookSchema.virtual('daysRemaining').get(function() {
  const today = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
});

BorrowedBookSchema.set('toJSON', { virtuals: true });