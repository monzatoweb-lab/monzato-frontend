import React from 'react';
import { HeroSection } from './HeroSection';
import { ProductCarousel } from './ProductCarousel';
import { SecondaryHero } from './SecondaryHero';
import { BannerGrid } from './BannerGrid';

export const HomePage = () => (
  <>
    <HeroSection />
    <ProductCarousel />
    <SecondaryHero />
    <BannerGrid />
  </>
);
