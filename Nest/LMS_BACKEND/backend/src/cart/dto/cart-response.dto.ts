export class CartResponseDto {
  _id: string;
  userId: string;
  items: Array<{
    bookId: {
      _id: string;
      title: string;
      author: string;
      isbn: string;
      perDayCharge: number;
      availableCount: number;
    };
    quantity: number;
    duration: number;
    addedAt: Date;
  }>;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

