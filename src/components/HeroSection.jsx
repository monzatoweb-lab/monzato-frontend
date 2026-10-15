import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Button } from './common';
import { scrollToElement } from '../utils';

export const HeroSection = () => {
  const { setQuickViewProduct, setIsCartOpen } = useCart();
  const chartreuseProduct = PRODUCTS.find(p => p.id === 'chartreuse-royale-suit');

  return (
    <section className="relative w-full h-[78vh] min-h-[580px] max-h-[850px] overflow-hidden bg-neutral-900">
      
  
      <div className="absolute inset-0">
        <img
          src="/images/hero_chartreuse.jpg"
          alt="MONZATO Chartreuse Royale Collection"
          className="w-full h-full object-cover object-top sm:object-center transition-transform duration-1000 scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>


      <div className="relative h-full max-w-[1440px] mx-auto px-6 flex flex-col justify-end pb-14 sm:pb-20 text-center items-center">
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.14em] text-white uppercase font-serif-luxury drop-shadow-md mb-6 sm:mb-8">
          CHARTREUSE ROYALE
        </h1>

 
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-md">
          
          <Button
            variant="outline-white"
            fullWidth
            onClick={() => scrollToElement('products')}
          >
            Explore
          </Button>

          <Button
            variant="filled-white"
            fullWidth
            onClick={() => {
              if (chartreuseProduct) {
                setQuickViewProduct(chartreuseProduct);
              }
            }}
          >
            Shop Now
          </Button>

        </div>

      </div>

    </section>
  );
};
