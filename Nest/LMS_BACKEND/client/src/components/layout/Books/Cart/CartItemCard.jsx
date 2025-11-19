import React from 'react';
import { Button } from '../../../../common/Button';
import { useUpdateCartItem, useRemoveFromCart } from '../../../../hooks/useCart';

export const CartItemCard = ({ item }) => {
  const updateCartMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    
    updateCartMutation.mutate({
      bookId: item.bookId._id,
      data: { quantity: newQuantity }
    });
  };

  const handleUpdateDuration = (newDuration) => {
    if (newDuration < 1) return;
    
    updateCartMutation.mutate({
      bookId: item.bookId._id,
      data: { duration: newDuration }
    });
  };

  const handleRemove = () => {
    removeFromCartMutation.mutate(item.bookId._id);
  };

  const totalCharge = item.bookId.perDayCharge * item.duration * item.quantity;

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{item.bookId.title}</h4>
          <p className="text-sm text-gray-600">By {item.bookId.author}</p>
          <p className="text-xs text-gray-500">${item.bookId.perDayCharge}/day</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          loading={removeFromCartMutation.isLoading}
          className="text-red-600 hover:text-red-700"
        >
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1 || updateCartMutation.isLoading}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              -
            </button>
            <span className="text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={updateCartMutation.isLoading}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Duration (days)
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleUpdateDuration(item.duration - 1)}
              disabled={item.duration <= 1 || updateCartMutation.isLoading}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              -
            </button>
            <span className="text-sm font-medium">{item.duration}</span>
            <button
              onClick={() => handleUpdateDuration(item.duration + 1)}
              disabled={updateCartMutation.isLoading}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          Total: ${totalCharge.toFixed(2)}
        </span>
        <span className="text-xs text-gray-500">
          {item.quantity} book(s) × {item.duration} days
        </span>
      </div>
    </div>
  );
};