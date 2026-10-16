import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const TF_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      showToast('Thank you for subscribing to MONZATO Newsletter!');
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 4000);
    } else {
      showToast('Please enter a valid email address.');
    }
  };

  return (
    <section
      style={{
        background: '#fff',
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        padding: '60px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        <h2
          style={{
            fontFamily: TF_FONT,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#000',
            marginBottom: '10px',
          }}
        >
          Subscribe to Newsletter
        </h2>

        <p
          style={{
            fontFamily: TF_FONT,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: '#666',
            marginBottom: '28px',
            lineHeight: 1.7,
          }}
        >
          Subscribe to receive updates on new arrivals, exclusive offers and latest news from MONZATO.
        </p>

        {isSubmitted ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 20px',
              border: '1px solid #000',
              fontFamily: TF_FONT,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#000',
            }}
          >
            <Check size={14} strokeWidth={2} />
            <span>SUBSCRIBED</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              borderBottom: '1.5px solid #000',
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              required
              style={{
                flex: 1,
                fontFamily: TF_FONT,
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#000',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '8px 0',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: TF_FONT,
                fontSize: '20px',
                color: '#000',
                padding: '0 4px 4px',
                lineHeight: 1,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.4'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              aria-label="Subscribe"
            >
              →
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
