import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './common';

export const ProductCarousel = () => {
  const scrollRef = useRef(null);
  const { products, addToCart, wishlist, toggleWishlist, setQuickViewProduct, openProductDetails } = useCart();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="products" className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        
        {/* Carousel Navigation Arrow Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-neutral-700 hover:text-black hover:scale-110 transition-all focus:outline-none cursor-pointer"
          aria-label="Previous products"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-neutral-700 hover:text-black hover:scale-110 transition-all focus:outline-none cursor-pointer"
          aria-label="Next products"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>

        {/* Scrollable Container / Grid */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 scroll-smooth px-8 sm:px-10"
        >
          {products.map((product) => {
            const pId = product.id || product._id || product.slug;
            const isWishlisted = wishlist.includes(pId);

            return (
              <div
                key={pId}
                className="flex-none w-[260px] sm:w-[300px] lg:w-[calc(25%-18px)] group cursor-pointer"
              >
                {/* Image Container with light grey studio background */}
                <div 
                  onClick={() => openProductDetails(product)}
                  className="relative bg-[#f4f4f4] aspect-[4/5] overflow-hidden mb-4 flex items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
                      product.hoverImage
                        ? 'group-hover:opacity-0 group-hover:scale-105'
                        : 'group-hover:scale-105'
                    }`}
                  />
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} hover`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(pId);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-xs transition-colors cursor-pointer ${
                      isWishlisted ? 'text-red-500 fill-red-500' : 'text-neutral-600 hover:text-black'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button
                      variant="filled-white"
                      size="sm"
                      icon={ShoppingBag}
                      fullWidth
                      className="bg-white text-black hover:bg-neutral-100 hover:text-black border-0 text-[11px] py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Bag
                    </Button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="p-2 bg-white text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                      title="Quick View"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Title and Price */}
                <div className="text-left space-y-1">
                  <h3 
                    onClick={() => openProductDetails(product)}
                    className="text-sm sm:text-base font-semibold text-neutral-950 hover:text-neutral-600 transition-colors"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-neutral-600">
                    {product.formattedPrice || `$${product.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
