import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts, getCategories } from '../services/productApi';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, AlertCircle } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const categoryFromUrl = searchParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'rating'

  // Update selectedCategory when URL query changes
  useEffect(() => {
    const urlCat = searchParams.get('category') || '';
    setSelectedCategory(urlCat);
  }, [searchParams]);

  // Load products & categories from API
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Failed to load shop data:', err);
      setError(err.message || 'Unable to connect to the catalog API. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle changing category and updating URL param
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('default');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query (title and description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
      );
    }

    // Sort products
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shop Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse our handpicked collection of clothes, electronics, and accessories.
          </p>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-2">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search products by title or keyword..."
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 justify-end">
              <div className="relative w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-48 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer shadow-sm"
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Category:
            </span>
            <div className="flex-1 overflow-hidden">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          </div>
        </div>

        {/* Results Info & Active Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="text-sm font-medium text-slate-600">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>

          {(selectedCategory || searchQuery || sortBy !== 'default') && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto my-12">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-red-800 mb-1">Failed to load products</h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!error && (
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            onClearFilters={handleClearFilters}
          />
        )}
      </div>
    </div>
  );
};

export default Shop;
