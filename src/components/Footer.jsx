import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Free Express Delivery</h4>
                <p className="text-xs text-slate-300 mt-0.5">On all orders exceeding $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Secure Shopping</h4>
                <p className="text-xs text-slate-300 mt-0.5">100% verified protected checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">30-Day Returns</h4>
                <p className="text-xs text-slate-300 mt-0.5">Simple hassle-free exchange policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">24/7 Dedicated Support</h4>
                <p className="text-xs text-slate-300 mt-0.5">Friendly support whenever needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Shop<span className="text-indigo-400">Ease</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              ShopEase is a modern, responsive e-commerce web application powered by the Fake Store API.
              Designed with simplicity, speed, and elegance for modern shoppers.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-slate-800 text-indigo-300 text-xs rounded-full font-medium border border-slate-700">
                Portfolio Showcase Edition
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-slate-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-300 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors">
                  Demo Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=men's clothing" className="text-slate-300 hover:text-white transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/shop?category=women's clothing" className="text-slate-300 hover:text-white transition-colors">
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link to="/shop?category=jewelery" className="text-slate-300 hover:text-white transition-colors">
                  Jewelery & Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="text-slate-300 hover:text-white transition-colors">
                  Consumer Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Stay in touch */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-slate-300 mb-3">
              Get notified when special seasonal sales and collection updates drop.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter demo!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-10 mt-10 border-t border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ShopEase. Built with React.js, Tailwind CSS & Fake Store API.</p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Crafted for portfolio showcase</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
