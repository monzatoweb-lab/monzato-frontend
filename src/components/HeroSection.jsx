import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { scrollToElement } from '../utils';

const SLIDES = [
  {
    image: '/images/hero_chartreuse.jpg',
    label: "NEW COLLECTION",
    headline: "MEN'S WINTER",
    cta: 'SHOP NOW',
    href: '#products',
  },
  {
    image: '/images/hero_tailored.jpg',
    label: "TAILORED FOR YOU",
    headline: "BESPOKE SUITS",
    cta: 'EXPLORE',
    href: '#tailored',
  },
];

export const HeroSection = () => {
  const { setQuickViewProduct } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const goToNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
      setTransitioning(false);
    }, 600);
  };

  const goTo = (i) => {
    if (i === currentSlide) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(i);
      setTransitioning(false);
    }, 600);
  };

  const slide = SLIDES[currentSlide];

  const handleCta = () => {
    scrollToElement(slide.href.replace('#', ''));
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        // Tom Ford hero is viewport height minus navbar (approx 90vh)
        height: 'calc(100vh - 72px)',
        minHeight: '500px',
        maxHeight: '900px',
        overflow: 'hidden',
        background: '#e8e4df',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.6s ease-in-out',
        }}
      >
        <img
          src={slide.image}
          alt={slide.headline}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Very subtle gradient at bottom-left for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top right, rgba(0,0,0,0.28) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* Bottom-Left Text + CTA — Tom Ford style */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '40px',
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.6s ease-in-out',
        }}
      >
        {/* Category label */}
        <p
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#fff',
            textTransform: 'uppercase',
            marginBottom: '8px',
            opacity: 0.85,
          }}
        >
          {slide.label}
        </p>

        {/* Headline — bold, large */}
        <h1
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 'clamp(22px, 3.5vw, 42px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#fff',
            textTransform: 'uppercase',
            margin: '0 0 20px 0',
            lineHeight: 1.1,
            textShadow: '0 1px 4px rgba(0,0,0,0.25)',
          }}
        >
          {slide.headline}
        </h1>

        {/* Tom Ford CTA Button: bordered, small, uppercase */}
        <button
          onClick={handleCta}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '9px 20px',
            border: '1.5px solid #fff',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
            backdropFilter: 'blur(2px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = '#fff';
          }}
        >
          {slide.cta}
        </button>
      </div>

      {/* Slide Dots — Bottom Center */}
      {SLIDES.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === currentSlide ? '24px' : '8px',
                height: '2px',
                background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};
