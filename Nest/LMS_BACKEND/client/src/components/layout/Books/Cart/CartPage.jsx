import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartItemCard } from './CartItemCard';
import { Button } from '../../../../common/Button';
import { useCart, useClearCart } from '../../../../hooks/useCart';
import { useBorrowRequests } from '../../../../hooks/useBorrowRequests';
import { Loader } from '../../../../common/Loader';
import toast from 'react-hot-toast';

export const CartPage = () => {
  const { data: cartData, isLoading, error } = useCart();
  const clearCartMutation = useClearCart();
  const createBorrowRequestMutation = useBorrowRequests();

  const handleCheckout = () => {
    createBorrowRequestMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Borrow request submitted successfully!');
      }
    });
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Failed to load cart</div>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  const items = cartData?.items || [];
  const totalAmount = items.reduce((total, item) => {
    return total + (item.bookId.perDayCharge * item.duration * item.quantity);
  }, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Your cart is empty</div>
        <p className="text-gray-400 mt-2">Add some books to get started</p>
        <Link to="/books">
          <Button className="mt-4">Browse Books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={handleClearCart}
          loading={clearCartMutation.isLoading}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <CartItemCard key={item.bookId._id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary-red">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              loading={createBorrowRequestMutation.isLoading}
              className="w-full"
            >
              Request Books
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              By proceeding, you agree to our borrowing terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};