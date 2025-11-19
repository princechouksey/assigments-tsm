import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BorrowRequestDocument = BorrowRequest & Document;

export enum BorrowRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  RETURNED = 'returned',
  OVERDUE = 'overdue'
}

@Schema({ timestamps: true })
export class BorrowRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([{
    bookId: { type: Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, default: 1, min: 1 },
    duration: { type: Number, required: true, min: 1 },
    perDayCharge: { type: Number, required: true, min: 0 }
  }])
  books: Array<{
    bookId: Types.ObjectId;
    quantity: number;
    duration: number;
    perDayCharge: number;
  }>;

  @Prop({ required: true, enum: BorrowRequestStatus, default: BorrowRequestStatus.PENDING })
  status: BorrowRequestStatus;

  @Prop({ required: true, min: 0 })
  totalAmount: number;

  @Prop({ default: Date.now })
  requestDate: Date;

  @Prop()
  approvedDate: Date;

  @Prop()
  dueDate: Date;

  @Prop()
  returnedDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy: Types.ObjectId;

  @Prop()
  rejectionReason: string;

  @Prop({ default: 0 })
  fineAmount: number;

  @Prop({ default: false })
  finePaid: boolean;
}

export const BorrowRequestSchema = SchemaFactory.createForClass(BorrowRequest);