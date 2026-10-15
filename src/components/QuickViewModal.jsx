import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './common';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, openProductDetails } = useCart();
  const [selectedSize, setSelectedSize] = useState('44');
  const [activeImage, setActiveImage] = useState(null);

  if (!quickViewProduct) return null;

  const currentImg = activeImage || quickViewProduct.image;
  const isWishlisted = wishlist.includes(quickViewProduct.id || quickViewProduct._id);
  const sizes = ['38', '40', '42', '44', '46', '48', '50'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={() => {
          setQuickViewProduct(null);
          setActiveImage(null);
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-white max-w-4xl w-full shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setQuickViewProduct(null);
            setActiveImage(null);
          }}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-black transition-colors bg-white/80 rounded-full cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left: High-Res Image & Gallery */}
        <div className="bg-[#f4f4f4] aspect-[4/5] md:aspect-auto h-full flex flex-col items-center justify-center p-4 relative">
          <img
            src={currentImg}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Gallery Thumbnails if Hover Image exists */}
          {quickViewProduct.hoverImage && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-full border border-neutral-200">
              <button
                onClick={() => setActiveImage(quickViewProduct.image)}
                className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                  currentImg === quickViewProduct.image ? 'border-neutral-900 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={quickViewProduct.image} alt="Front View" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveImage(quickViewProduct.hoverImage)}
                className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                  currentImg === quickViewProduct.hoverImage ? 'border-neutral-900 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={quickViewProduct.hoverImage} alt="Hover View" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
              {quickViewProduct.category} | HAUTE COUTURE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 uppercase tracking-wide font-serif-luxury mt-1">
              {quickViewProduct.name}
            </h2>
            <p className="text-lg font-semibold text-neutral-900 mt-2">
              {quickViewProduct.formattedPrice}
            </p>

            <p className="text-xs text-neutral-600 leading-relaxed mt-4">
              {quickViewProduct.description}
            </p>

            {/* Product Specs */}
            <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
              <p><span className="font-semibold text-neutral-900">Color:</span> {quickViewProduct.color}</p>
              <p><span className="font-semibold text-neutral-900">Material:</span> {quickViewProduct.material}</p>
              <p><span className="font-semibold text-neutral-900">Fit:</span> {quickViewProduct.fit}</p>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-neutral-900 uppercase tracking-wider">Select Italian Size</span>
                <a href="#" className="text-neutral-500 underline text-[11px]">Size Guide</a>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-semibold border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-200 text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  icon={ShoppingBag}
                  fullWidth
                  onClick={() => {
                    addToCart(quickViewProduct, selectedSize);
                    setQuickViewProduct(null);
                  }}
                >
                  ADD TO BAG
                </Button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3.5 border border-neutral-300 hover:border-black transition-colors cursor-pointer ${
                    isWishlisted ? 'text-red-500 fill-red-500 border-red-200' : 'text-neutral-700'
                  }`}
                  title="Wishlist"
                >
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <Button
                variant="subtle"
                size="sm"
                fullWidth
                onClick={() => {
                  openProductDetails(quickViewProduct);
                  setQuickViewProduct(null);
                }}
              >
                VIEW FULL DETAILS & REVIEWS →
              </Button>
            </div>

            {/* Shipping & Authenticity perks */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-500 pt-2">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-neutral-700" />
                <span>Complimentary Express Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-neutral-700" />
                <span>100% Authentic Italian Tailoring</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
