import React from 'react';
import { HeroSection } from './HeroSection';
import { ProductCarousel } from './ProductCarousel';
import { SecondaryHero } from './SecondaryHero';
import { BannerGrid } from './BannerGrid';
import { CustomShirtSection } from './CustomShirtSection';

export const HomePage = () => (
  <>
    <HeroSection />
    <ProductCarousel />
    <SecondaryHero />
    <BannerGrid />
    <CustomShirtSection />
  </>
);
