import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Button } from './common';

export const BannerGrid = () => {
  const { openProductDetails } = useCart();

  return (
    <section id="tailored" className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">

 
        <div className="relative h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden group">
          <img
            src="/images/banner_emerald.jpg"
            alt="Tailored For Everyday"
            className="w-full h-full object-cover img-zoom-hover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl sm:text-4xl font-bold tracking-[0.12em] text-white uppercase font-serif-luxury drop-shadow-md mb-6">
              TAILORED FOR EVERYDAY
            </h3>

            <Button variant="outline-white" onClick={() => openProductDetails(PRODUCTS[0])}>
              Shop Now
            </Button>
          </div>
        </div>

        <div id="accessories" className="relative h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden group">
          <img
            src="/images/banner_accessories.jpg"
            alt="Silk Accessories"
            className="w-full h-full object-cover img-zoom-hover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl sm:text-4xl font-bold tracking-[0.12em] text-white uppercase font-serif-luxury drop-shadow-md mb-6">
              SILK ACCESSORIES
            </h3>

            <Button variant="outline-white" onClick={() => openProductDetails(PRODUCTS[1])}>
              Shop Now
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
 