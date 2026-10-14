import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Menu, X, LogOut, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, toastMessage } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-2 rounded-md ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 font-semibold'
        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block text-base font-medium px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 font-semibold'
        : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-indigo-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-indigo-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Shop<span className="text-indigo-600">Ease</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600 -mt-1">
                Modern Market
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
          </nav>

          {/* Right Action Icons (Cart, Auth, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Link with live badge */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors flex items-center justify-center"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scaleIn">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* User Profile / Auth Desktop Button */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{user?.name || user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Log out"
                    className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
                >
                  <User className="w-4 h-4" />
                  <span>Demo Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Shop Products
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            Cart ({totalItems})
          </NavLink>

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {user?.name || user?.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block py-2.5 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors"
              >
                Demo Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
