import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    totalItems,
    subtotal,
    shipping,
    tax,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const freeShippingThreshold = 50;
  const freeShippingDifference = freeShippingThreshold - subtotal;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-slate-50 text-center">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Your shopping cart is empty
        </h2>
        <p className="text-sm text-slate-500 max-w-md mb-8">
          Looks like you haven't added anything to your cart yet. Explore our top products and find something you love!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              You have <strong className="text-slate-800">{totalItems}</strong> {totalItems === 1 ? 'item' : 'items'} in your cart.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors py-2 px-3 hover:bg-red-50 rounded-xl"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Cart
          </button>
        </div>

        {/* Free Shipping Progress Callout */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Truck className="w-4 h-4 text-indigo-600" />
              {freeShippingDifference <= 0 ? (
                <span className="text-emerald-600 font-bold">
                  Congratulations! You unlocked FREE Standard Shipping! 🎉
                </span>
              ) : (
                <span>
                  Add <strong className="text-indigo-600">${freeShippingDifference.toFixed(2)}</strong> more to get Free Shipping
                </span>
              )}
            </span>
            <span className="text-slate-500">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingDifference <= 0 ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Layout: Items List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-24 h-24 p-2 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mb-1">
                      {item.category}
                    </span>
                    <Link
                      to={`/product/${item.id}`}
                      className="block text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors truncate"
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                    <div className="text-xs text-slate-500 mt-1">
                      Unit price: ${Number(item.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors rounded-l-xl"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors rounded-r-xl"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[80px]">
                    <span className="block text-sm font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Remove item"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-900">
                  <span>Total Due</span>
                  <span className="text-xl text-indigo-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-200 hover:shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-500 space-y-2 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed Safe Demo Checkout</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  No real payments are charged. All order confirmations are processed for frontend demonstration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
