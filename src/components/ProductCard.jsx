import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full relative">
      {/* Product Image Link */}
      <Link
        to={`/product/${product.id}`}
        className="block relative bg-white p-6 h-56 flex items-center justify-center overflow-hidden border-b border-slate-100"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
        />
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-slate-100/90 backdrop-blur-sm text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-700">
              {product.rating?.rate?.toFixed(1) || '4.0'}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.rating?.count || 0})
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-3"
            title={product.title}
          >
            {product.title}
          </Link>
        </div>

        {/* Price & Add to Cart action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
          <div>
            <span className="text-xs text-slate-600 block">Price</span>
            <span className="text-lg font-bold text-slate-900">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-md'
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
