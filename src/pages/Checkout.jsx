import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  Truck,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';

const Checkout = () => {
  const { cartItems, totalItems, subtotal, shipping, tax, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: user ? user.name || user.username : 'John Doe',
    email: user ? `${user.username}@example.com` : 'john.doe@example.com',
    address: '123 Market Street',
    city: 'San Francisco',
    postalCode: '94105',
    paymentMethod: 'card',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate quick processing
    setTimeout(() => {
      const orderId = 'SE-' + Math.floor(100000 + Math.random() * 900000);
      const placedOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [...cartItems],
        total: totalPrice,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        customerName: formData.fullName,
      };

      setOrderConfirmed(placedOrder);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  // If order is completed, show the success confirmation screen
  if (orderConfirmed) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg text-center animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full mb-3">
            Demo Order Placed Successfully!
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Thank you, {orderConfirmed.customerName}!
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Your demo order has been received and simulated. A mock receipt has been generated.
          </p>

          {/* Receipt details */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left text-xs text-slate-600 space-y-2.5 mb-8">
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="font-semibold text-slate-700">Order Number:</span>
              <span className="font-mono font-bold text-indigo-600">{orderConfirmed.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{orderConfirmed.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Destination:</span>
              <span className="truncate max-w-[200px]">{orderConfirmed.shippingAddress}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
              <span>Total Amount:</span>
              <span className="text-indigo-600">${orderConfirmed.total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/shop"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all hover:scale-[1.02]"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty and no confirmed order, redirect to cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No items to checkout</h2>
        <p className="text-sm text-slate-500 mb-6">
          Your cart is currently empty. Please add items before checking out.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout Demo
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Fill in your details below to place a demo mock order.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  1. Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  2. Demo Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-indigo-200 bg-indigo-50/50 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        Credit / Debit Card (Simulated)
                      </span>
                      <span className="text-xs text-slate-500">
                        Instant demo sandbox approval
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                </label>

                <label className="flex items-center justify-between p-4 border border-slate-200 hover:border-slate-300 rounded-2xl cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        Cash on Delivery
                      </span>
                      <span className="text-xs text-slate-500">
                        Pay upon doorstep parcel receipt
                      </span>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-slate-400" />
                </label>
              </div>
            </div>
          </div>

          {/* Checkout Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Review ({totalItems})
              </h2>

              {/* Items preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <div className="w-12 h-12 p-1 bg-white border border-slate-100 rounded-lg shrink-0 flex items-center justify-center">
                      <img src={item.image} alt="" className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-800 truncate">{item.title}</div>
                      <div className="text-slate-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 text-white font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-200" />
                    <span>Place Demo Order (${totalPrice.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 justify-center text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulated e-commerce checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
