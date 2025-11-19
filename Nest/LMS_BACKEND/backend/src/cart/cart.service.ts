import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { BooksService } from '../books/books.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private booksService: BooksService,
  ) {}

  async getCart(userId: string): Promise<CartDocument> {
    let cart = await this.cartModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('items.bookId')
      .exec();

    if (!cart) {
      cart = new this.cartModel({ userId: new Types.ObjectId(userId), items: [] });
      await cart.save();
    }

    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<CartDocument> {
    // normalize bookId: client might send object or stringified object accidentally
    let bookIdStr: string;
    if (typeof addToCartDto.bookId === 'string') {
      const raw = addToCartDto.bookId.trim();
      if (raw.startsWith('{')) {
        try {
          const parsed = JSON.parse(raw);
          bookIdStr = parsed._id || parsed.id || raw;
        } catch (e) {
          bookIdStr = raw;
        }
      } else {
        bookIdStr = raw;
      }
    } else if (typeof addToCartDto.bookId === 'object' && addToCartDto.bookId !== null) {
      bookIdStr = (addToCartDto.bookId as any)._id || (addToCartDto.bookId as any).id;
    } else {
      bookIdStr = String(addToCartDto.bookId);
    }

    const book = await this.booksService.findOne(bookIdStr);
    
    if (book.availableCount < addToCartDto.quantity) {
      throw new NotFoundException('Not enough books available');
    }

    let cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });

    if (!cart) {
      cart = new this.cartModel({ 
        userId: new Types.ObjectId(userId), 
        items: [] 
      });
    }

    const existingItemIndex = cart.items.findIndex(
      item => (item.bookId && item.bookId.toString && item.bookId.toString()) === bookIdStr
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += addToCartDto.quantity;
      cart.items[existingItemIndex].duration = addToCartDto.duration;
    } else {
      cart.items.push({
        bookId: new Types.ObjectId(bookIdStr),
        quantity: addToCartDto.quantity,
        duration: addToCartDto.duration,
        addedAt: new Date(),
      });
    }

    return cart.save();
  }

  async updateCartItem(
    userId: string, 
    bookId: string, 
    updateCartItemDto: UpdateCartItemDto
  ): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      item => item.bookId.toString() === bookId
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    if (updateCartItemDto.quantity !== undefined) {
      cart.items[itemIndex].quantity = updateCartItemDto.quantity;
    }

    if (updateCartItemDto.duration !== undefined) {
      cart.items[itemIndex].duration = updateCartItemDto.duration;
    }

    return cart.save();
  }

  async removeFromCart(userId: string, bookId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
    return cart.save();
  }

  async clearCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    return cart.save();
  }

  async calculateTotalAmount(cart: CartDocument): Promise<number> {
    let total = 0;
    
    for (const item of cart.items) {
      const bookId = typeof item.bookId === 'object'
        ? item.bookId._id
        : item.bookId;
      const book = await this.booksService.findOne(bookId.toString());
      total += book.perDayCharge * item.duration * item.quantity;
    }
    
    return total;
  }
}