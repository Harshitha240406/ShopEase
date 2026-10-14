import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getCategories } from '../services/productApi';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Loading';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Tag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Tv,
  Gem,
  Shirt,
} from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        const [products, cats] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);
        // Pick the top 4 highly rated products as featured
        const topRated = [...products]
          .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
          .slice(0, 4);
        setFeaturedProducts(topRated);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load home page products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Category visual icons map
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'electronics':
        return <Tv className="w-6 h-6 text-indigo-600" />;
      case 'jewelery':
        return <Gem className="w-6 h-6 text-amber-500" />;
      case "men's clothing":
        return <Shirt className="w-6 h-6 text-blue-600" />;
      case "women's clothing":
        return <Shirt className="w-6 h-6 text-rose-500" />;
      default:
        return <Tag className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-slate-50 border-b border-slate-200/80 pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm text-xs font-semibold text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Modern Minimalist Shopping Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Elevate Your Daily Living with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
                ShopEase
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore thoughtfully curated apparel, fine jewelery, and premium consumer electronics. Fast, intuitive, and seamlessly organized.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all hover:scale-105"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border border-slate-200 shadow-sm transition-all"
              >
                <span>Browse Categories</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Live Fake Store API data
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-500" />
                Free shipping over $50
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Instant cart persistence
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* 2. Product Categories Showcase */}
        <section id="categories" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Collections</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
            >
              <span>Explore all collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 capitalize group-hover:text-indigo-600 transition-colors">
                    {cat}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Discover popular items in {cat}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Browse category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Promotional Banner */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-400/30 uppercase tracking-wider">
              Limited Time Promotion
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Upgrade Your Wardrobe & Gear for Less
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Enjoy verified quality standards, seamless simulated checkout, and automatic free shipping on all orders over $50.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                <span>Shop Today's Best Sellers</span>
              </Link>
            </div>
          </div>
          {/* Subtle ambient blur background */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* 4. Featured Products Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Handpicked Selection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
            >
              <span>View full catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
