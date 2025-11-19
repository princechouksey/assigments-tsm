export class UpdateBookDto {
  title?: string;
  author?: string;
  publisher?: string;
  category?: string;
  isbn?: string;
  publicationYear?: number;
  price?: number;
  totalCount?: number;
  availableCount?: number;
  description?: string;
  imageUrl?: string;
  perDayCharge?: number;
}