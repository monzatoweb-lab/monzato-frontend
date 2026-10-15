import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Button } from './common';

export const SecondaryHero = () => {
  const { setQuickViewProduct } = useCart();
  const midnightProduct = PRODUCTS.find(p => p.id === 'midnight-haze-suit');

  return (
    <section id="midnight-haze" className="relative w-full h-[75vh] min-h-[550px] max-h-[800px] overflow-hidden bg-neutral-950">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_midnight.jpg"
          alt="MONZATO Midnight Haze Collection"
          className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content overlay centered at lower center */}
      <div className="relative h-full max-w-[1440px] mx-auto px-6 flex flex-col justify-end pb-16 sm:pb-24 items-center sm:items-end sm:pr-24 lg:pr-32">
        
        <div className="text-center sm:text-right max-w-xl">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.14em] text-white uppercase font-serif-luxury drop-shadow-lg mb-6">
            MIDNIGHT HAZE
          </h2>

          <Button
            variant="outline-white"
            size="lg"
            onClick={() => {
              if (midnightProduct) setQuickViewProduct(midnightProduct);
            }}
          >
            Shop Now
          </Button>
        </div>

      </div>

    </section>
  );
};
