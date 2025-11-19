export class CreateBookDto {
  title: string;
  author: string;
  publisher: string;
  category: string;
  isbn: string;
  publicationYear: number;
  price: number;
  totalCount: number;
  description?: string;
  imageUrl?: string;
  perDayCharge?: number;
}