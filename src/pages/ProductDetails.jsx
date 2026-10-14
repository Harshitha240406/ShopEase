import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../services/productApi';
import { useCart } from '../context/CartContext';
import { ProductDetailSkeleton } from '../components/Loading';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  AlertTriangle,
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      setQuantity(1);
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Fetch related products in the same category
        if (data.category) {
          try {
            const related = await getProductsByCategory(data.category);
            setRelatedProducts(related.filter((item) => item.id !== data.id).slice(0, 4));
          } catch {
            // Silently fallback without breaking main product page
            setRelatedProducts([]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError(err.message || 'Product could not be found.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          {error || "The product you're looking for doesn't exist or an API error occurred."}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-indigo-600 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-indigo-600 transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-10 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Container */}
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center border border-slate-100 min-h-[350px] sm:min-h-[460px]">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[380px] w-auto max-w-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Meta & Actions */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                {/* Category Pill */}
                <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  {product.category}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                    <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 text-amber-500" />
                    <span className="text-xs font-bold text-amber-900">
                      {product.rating?.rate?.toFixed(1) || '4.0'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {product.rating?.count || 0} customer reviews
                  </span>
                </div>

                {/* Price */}
                <div className="text-3xl font-black text-slate-900 mb-6">
                  ${Number(product.price).toFixed(2)}
                </div>

                {/* Description */}
                <div className="border-t border-b border-slate-100 py-4 mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed capitalize-first">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Selector & Add To Cart Button */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={handleDecrement}
                        className="p-2.5 hover:bg-slate-200 text-slate-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrement}
                        className="p-2.5 hover:bg-slate-200 text-slate-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdded}
                      className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-200'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-lg'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                        </>
                      )}
                    </button>
                    <Link
                      to="/cart"
                      className="inline-flex items-center justify-center py-3.5 px-6 rounded-2xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Free shipping on $50+</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>30-day easy returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Verified authenticity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                You May Also Like
              </h2>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View all in {product.category} →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
