import React from 'react';
import { Button } from '../../../common/Button';
import { useAuth } from '../../../context/AuthContext';
import { useAddToCart } from '../../../hooks/useCart';

export const BookCard = ({ book }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const addToCartMutation = useAddToCart();

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      bookId: book._id,
      quantity: 1,
      duration: 7, // Default 7 days
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-1">By {book.author}</p>
        <p className="text-gray-500 text-xs mb-3">{book.publisher} • {book.publicationYear}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Category: {book.category}</span>
          <span className="text-primary-red font-semibold">${book.price}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>Available: {book.availableCount}/{book.totalCount}</span>
          <span>${book.perDayCharge}/day</span>
        </div>

        {isAuthenticated && !isAdmin && book.availableCount > 0 && (
          <Button
            onClick={handleAddToCart}
            loading={addToCartMutation.isLoading}
            className="w-full"
            size="sm"
          >
            Add to Cart
          </Button>
        )}

        {book.availableCount === 0 && (
          <div className="text-center text-red-600 text-sm font-medium py-2 border border-red-200 rounded bg-red-50">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
};