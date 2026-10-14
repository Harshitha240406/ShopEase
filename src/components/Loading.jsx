import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Standard spinner component
 */
export const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
};

/**
 * Single product card skeleton loader
 */
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse flex flex-col h-full">
      <div className="h-56 bg-slate-100 w-full" />
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-100 rounded w-3/4" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-9 bg-slate-200 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
};

/**
 * Product grid skeleton showing 8 placeholder cards
 */
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

/**
 * Detailed single product page skeleton
 */
export const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-5 bg-slate-200 rounded w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="h-96 sm:h-[450px] bg-slate-100 rounded-xl" />
        <div className="space-y-6 flex flex-col justify-center">
          <div className="h-4 bg-slate-200 rounded w-28" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-6 bg-slate-100 rounded w-36" />
          <div className="h-8 bg-slate-200 rounded w-28" />
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-5/6" />
            <div className="h-4 bg-slate-100 rounded w-2/3" />
          </div>
          <div className="h-12 bg-slate-200 rounded-xl w-48 pt-4" />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
