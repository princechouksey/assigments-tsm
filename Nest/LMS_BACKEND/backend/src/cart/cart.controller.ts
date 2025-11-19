import { 
  Controller, Get, Post, Body, Param, Put, Delete, UseGuards 
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartResponseDto } from './dto/cart-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';


@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@GetUser() user: any): Promise<CartResponseDto> {
    const cart = await this.cartService.getCart(user._id);
    const totalAmount = await this.cartService.calculateTotalAmount(cart);
    
    return {
     _id: (cart as any)._id.toString(),
      userId: cart.userId.toString(),
      items: cart.items.map(item => ({
        bookId: {
          _id: (item.bookId as any)._id.toString(),
          title: (item.bookId as any).title,
          author: (item.bookId as any).author,
          isbn: (item.bookId as any).isbn,
          perDayCharge: (item.bookId as any).perDayCharge,
          availableCount: (item.bookId as any).availableCount,
        },
        quantity: item.quantity,
        duration: item.duration,
        addedAt: item.addedAt,
      })),
      totalAmount,
  createdAt: (cart as any).createdAt,
  updatedAt: (cart as any).updatedAt,
    };
  }

  @Post('add')
  async addToCart(
    @GetUser() user: any,
    @Body() addToCartDto: AddToCartDto
  ) {
    return this.cartService.addToCart(user._id, addToCartDto);
  }

  @Put('item/:bookId')
  async updateCartItem(
    @GetUser() user: any,
    @Param('bookId') bookId: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    return this.cartService.updateCartItem(user._id, bookId, updateCartItemDto);
  }

  @Delete('item/:bookId')
  async removeFromCart(
    @GetUser() user: any,
    @Param('bookId') bookId: string
  ) {
    return this.cartService.removeFromCart(user._id, bookId);
  }

  @Delete('clear')
  async clearCart(@GetUser() user: any) {
    return this.cartService.clearCart(user._id);
  }
}