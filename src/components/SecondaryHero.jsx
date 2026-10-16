import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SecondaryHero = () => {
  const { setQuickViewProduct } = useCart();
  const midnightProduct = PRODUCTS.find(p => p.id === 'midnight-haze-suit');

  return (
    <section
      id="midnight-haze"
      style={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        minHeight: '480px',
        maxHeight: '800px',
        overflow: 'hidden',
        background: '#1a1a1a',
      }}
    >
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="/images/hero_midnight.jpg"
          alt="MONZATO Midnight Haze Collection"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* Subtle bottom-left gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top right, rgba(0,0,0,0.32) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Bottom-Left Text — Tom Ford style */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '40px',
        }}
      >
        <p
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#fff',
            textTransform: 'uppercase',
            marginBottom: '8px',
            opacity: 0.8,
          }}
        >
          EYEWEAR
        </p>

        <h2
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 'clamp(22px, 3.2vw, 38px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#fff',
            textTransform: 'uppercase',
            margin: '0 0 20px 0',
            lineHeight: 1.1,
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        >
          MIDNIGHT HAZE
        </h2>

        <button
          onClick={() => { if (midnightProduct) setQuickViewProduct(midnightProduct); }}
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
          SHOP NOW
        </button>
      </div>
    </section>
  );
};
