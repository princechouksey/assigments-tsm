import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop([{
    bookId: { type: Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, default: 1, min: 1 },
    duration: { type: Number, required: true, min: 1 },
    addedAt: { type: Date, default: Date.now }
  }])
  items: Array<{
    bookId: Types.ObjectId;
    quantity: number;
    duration: number;
    addedAt: Date;
  }>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);