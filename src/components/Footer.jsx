import React from 'react';
import { Link } from 'react-router-dom';

const TF_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const FooterLink = ({ to, href, children }) => {
  const style = {
    fontFamily: TF_FONT,
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.06em',
    color: '#111',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'block',
    padding: '5px 0',
    transition: 'opacity 0.2s',
  };

  if (href) {
    return (
      <a
        href={href}
        style={style}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      to={to}
      style={style}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      {children}
    </Link>
  );
};

const ColHeader = ({ children }) => (
  <p style={{
    fontFamily: TF_FONT,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: '#000',
    textTransform: 'uppercase',
    marginBottom: '16px',
  }}>
    {children}
  </p>
);

export const Footer = () => {
  return (
    <footer
      style={{
        background: '#f0eeec',
        borderTop: '1px solid #ddd',
      }}
    >
      {/* ── Main Footer Grid ── */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '60px 40px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
        }}
      >
        {/* Customer Service */}
        <div>
          <ColHeader>Customer Service</ColHeader>
          <FooterLink to="/delivery-returns">Track & Return Order</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink href="#">Store Locator</FooterLink>
          <FooterLink href="#">Made to Measure</FooterLink>
          <FooterLink href="#">FAQ</FooterLink>
          <FooterLink to="/delivery-returns">Shipping & Returns</FooterLink>
        </div>

        {/* The Company */}
        <div>
          <ColHeader>The Company</ColHeader>
          <FooterLink to="/the-story">Our Story</FooterLink>
          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="#">Accessibility</FooterLink>
          <FooterLink href="#">Sustainability</FooterLink>
          <FooterLink href="#">Cookie Policy</FooterLink>
        </div>

        {/* Follow Us */}
        <div>
          <ColHeader>Follow Us</ColHeader>
          <FooterLink href="https://instagram.com">Instagram</FooterLink>
          <FooterLink href="https://facebook.com">Facebook</FooterLink>
          <FooterLink href="https://youtube.com">YouTube</FooterLink>
          <FooterLink href="https://pinterest.com">Pinterest</FooterLink>
          <FooterLink href="https://x.com">X</FooterLink>
        </div>

        {/* Newsletter */}
        <div style={{ gridColumn: 'span 1' }}>
          <ColHeader>Subscribe to Newsletter</ColHeader>
          <p style={{
            fontFamily: TF_FONT,
            fontSize: '11px',
            color: '#555',
            lineHeight: 1.7,
            marginBottom: '16px',
            letterSpacing: '0.02em',
          }}>
            Subscribe to receive updates on new arrivals, exclusive offers and more.
          </p>
          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: 'flex', gap: '0', borderBottom: '1px solid #000' }}
          >
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              style={{
                flex: 1,
                fontFamily: TF_FONT,
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#000',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '6px 0',
                textTransform: 'uppercase',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: TF_FONT,
                fontSize: '18px',
                color: '#000',
                padding: '0 4px 2px',
                lineHeight: 1,
              }}
              aria-label="Subscribe"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* ── Logo Row ── */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 40px 32px',
        }}
      >
        <button
          style={{
            fontFamily: TF_FONT,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#000',
            textTransform: 'uppercase',
            background: 'none',
            border: 'none',
            cursor: 'default',
            padding: 0,
          }}
        >
          MONZATO
        </button>
      </div>

      {/* ── Bottom Bar ── */}
      <div
        style={{
          borderTop: '1px solid #ddd',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '16px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        {[
          { label: 'Site Map', to: '#' },
          { label: 'Privacy Policy', to: '/privacy-policy' },
          { label: 'Terms & Conditions', to: '#' },
        ].map((item, i, arr) => (
          <React.Fragment key={item.label}>
            <Link
              to={item.to}
              style={{
                fontFamily: TF_FONT,
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#444',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {item.label}
            </Link>
            {i < arr.length - 1 && (
              <span style={{ color: '#aaa', fontSize: '10px', userSelect: 'none' }}>|</span>
            )}
          </React.Fragment>
        ))}
        <span style={{ color: '#aaa', fontSize: '10px', userSelect: 'none' }}>|</span>
        <span style={{
          fontFamily: TF_FONT,
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: '#444',
          textTransform: 'uppercase',
        }}>
          © MONZATO ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
};
