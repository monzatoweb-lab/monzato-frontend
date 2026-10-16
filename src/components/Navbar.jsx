import React, { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const Navbar = () => {
  const {
    totalItemsCount,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setQuickViewProduct,
    openProductDetails,
    activePage,
    setActivePage,
    setActiveAccountTab,
    user,
    setIsAuthModalOpen,
    logoutUser
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Focus search input when expanded
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchExpanded]);

  const navLinks = [
    { name: 'NEW ARRIVALS', href: '#products' },
    { name: 'SUITS', href: '#products' },
    { name: 'SHIRTS', href: '#products' },
    { name: 'OUTERWEAR', href: '#tailored' },
    { name: 'ACCESSORIES', href: '#accessories' },
  ];

  const profileMenuItems = [
    { label: 'Dashboard', tab: 'dashboard' },
    { label: 'Orders', tab: 'orders' },
    { label: 'Addresses', tab: 'addresses' },
    { label: 'Support', tab: 'support' },
    { label: 'Payment methods', tab: 'payment' },
    { label: 'Account details', tab: 'account-details' },
    { label: 'Wishlist', tab: 'wishlist' },
  ];

  const filteredProducts = searchQuery.trim() === ''
    ? []
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchClose = () => {
    setSearchExpanded(false);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* ─── DESKTOP / MOBILE HEADER ─── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.08)]' : 'border-b border-neutral-200'
        }`}
        style={{ height: '72px' }}
      >
        <div className="h-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">

          {/* ── LEFT: Logo ── */}
          <button
            onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
            className="flex-shrink-0 focus:outline-none"
            aria-label="MONZATO Home"
          >
            <span
              className="text-black uppercase select-none"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 700,
                letterSpacing: '0.14em',
                lineHeight: 1,
              }}
            >
              MONZATO
            </span>
          </button>

          {/* ── CENTER: Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center" style={{ gap: '2.8rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#000',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* ── RIGHT: Search, Account, Bag, Beauty (desktop) + Hamburger (mobile) ── */}
          <div className="flex items-center" style={{ gap: '1.4rem' }}>

            {/* Search Icon / Inline Search */}
            {!searchExpanded ? (
              <button
                onClick={() => setSearchExpanded(true)}
                className="flex items-center justify-center text-black hover:opacity-50 transition-opacity focus:outline-none"
                aria-label="Search"
                style={{ padding: '4px' }}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
            ) : (
              /* Inline search: replaces entire center/right with input bar */
              <div
                className="flex items-center"
                style={{
                  borderBottom: '1px solid #000',
                  gap: '8px',
                  minWidth: '280px',
                  paddingBottom: '2px',
                }}
              >
                <Search size={16} strokeWidth={1.5} style={{ color: '#000', flexShrink: 0 }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="ENTER KEYWORD OR ITEM NO."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) setIsSearchOpen(true);
                    else setIsSearchOpen(false);
                  }}
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    color: '#000',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    textTransform: 'uppercase',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#000',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}
                  >
                    CLEAR
                  </button>
                )}
                <button
                  onClick={handleSearchClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#000',
                    padding: '2px',
                    flexShrink: 0,
                  }}
                  aria-label="Close search"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}

            {/* Search Results Dropdown */}
            {searchExpanded && isSearchOpen && searchQuery.trim() !== '' && (
              <div
                className="absolute right-0 bg-white shadow-xl z-50"
                style={{
                  top: '72px',
                  left: 0,
                  right: 0,
                  borderTop: '1px solid #e5e5e5',
                  padding: '24px 40px',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#999',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  {filteredProducts.length} RESULTS FOR "{searchQuery.toUpperCase()}"
                </div>
                {filteredProducts.length === 0 ? (
                  <p style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '12px',
                    color: '#666',
                    textAlign: 'center',
                    padding: '24px 0',
                  }}>
                    No products found matching "{searchQuery}"
                  </p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          openProductDetails(p);
                          handleSearchClose();
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{
                          aspectRatio: '3/4',
                          background: '#f5f5f5',
                          overflow: 'hidden',
                          marginBottom: '8px',
                        }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        </div>
                        <p style={{
                          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: '#000',
                          textTransform: 'uppercase',
                          marginBottom: '2px',
                        }}>{p.name}</p>
                        <p style={{
                          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          fontSize: '11px',
                          color: '#555',
                        }}>{p.formattedPrice}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Account Icon with Hover Dropdown — DESKTOP only */}
            {!searchExpanded && (
              <div
                className="hidden lg:block relative"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <button
                  onClick={() => {
                    if (user) {
                      setActivePage('account');
                      setActiveAccountTab('dashboard');
                    } else {
                      setIsAuthModalOpen(true);
                    }
                  }}
                  className="flex items-center justify-center text-black hover:opacity-50 transition-opacity focus:outline-none"
                  aria-label="Account"
                  style={{ padding: '4px' }}
                >
                  <User size={20} strokeWidth={1.5} />
                </button>

                {/* Logged-in hover dropdown */}
                {isProfileHovered && user && (
                  <div
                    className="absolute right-0 bg-white border border-neutral-200 shadow-xl z-50"
                    style={{ top: 'calc(100% + 12px)', minWidth: '220px', padding: '8px 0' }}
                  >
                    <div style={{ padding: '12px 20px 10px', borderBottom: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#999', textTransform: 'uppercase', marginBottom: '3px' }}>SIGNED IN AS</p>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#000', letterSpacing: '0.05em' }}>{user.firstName} {user.lastName}</p>
                    </div>
                    {user.role === 'admin' && (
                      <a
                        href="http://localhost:5174"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 20px',
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: '#92400e',
                          background: '#fffbeb',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderBottom: '1px solid #fde68a',
                        }}
                      >
                        <span>👑 ADMIN</span>
                        <ChevronRight size={11} />
                      </a>
                    )}
                    {profileMenuItems.map((item) => (
                      <button
                        key={item.tab}
                        onClick={() => {
                          setActivePage('account');
                          setActiveAccountTab(item.tab);
                          setIsProfileHovered(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          textAlign: 'left',
                          padding: '9px 20px',
                          fontSize: '10px',
                          fontWeight: 400,
                          letterSpacing: '0.12em',
                          color: '#333',
                          textTransform: 'uppercase',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={10} style={{ opacity: 0.4 }} />
                      </button>
                    ))}
                    <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '4px', paddingTop: '4px' }}>
                      <button
                        onClick={() => { logoutUser(); setIsProfileHovered(false); }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '9px 20px',
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: '#888',
                          textTransform: 'uppercase',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#cc0000'}
                        onMouseLeave={e => e.currentTarget.style.color = '#888'}
                      >
                        SIGN OUT
                      </button>
                    </div>
                  </div>
                )}

                {/* Not logged-in hover card */}
                {isProfileHovered && !user && (
                  <div
                    className="absolute right-0 bg-white border border-neutral-200 shadow-xl z-50"
                    style={{ top: 'calc(100% + 12px)', minWidth: '200px', padding: '20px' }}
                  >
                    <p style={{ fontSize: '11px', color: '#555', marginBottom: '12px', letterSpacing: '0.04em', lineHeight: 1.5 }}>
                      Sign in to manage your MONZATO account
                    </p>
                    <button
                      onClick={() => { setIsAuthModalOpen(true); setIsProfileHovered(false); }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: '#000',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#333'}
                      onMouseLeave={e => e.currentTarget.style.background = '#000'}
                    >
                      SIGN IN / REGISTER
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Shopping Bag */}
            {!searchExpanded && (
              <button
                onClick={() => setActivePage('cart')}
                className="flex items-center justify-center text-black hover:opacity-50 transition-opacity focus:outline-none relative"
                aria-label="Shopping bag"
                style={{ padding: '4px' }}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItemsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-6px',
                      background: '#000',
                      color: '#fff',
                      fontSize: '9px',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {totalItemsCount}
                  </span>
                )}
              </button>
            )}

            {/* MONZATO BEAUTY > — Desktop only */}
            {!searchExpanded && (
              <a
                href="#"
                className="hidden xl:block"
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#000',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  paddingLeft: '16px',
                  borderLeft: '1px solid #ddd',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                MONZATO BEAUTY &gt;
              </a>
            )}

            {/* Mobile Hamburger */}
            {!searchExpanded && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center text-black hover:opacity-50 transition-opacity focus:outline-none"
                aria-label="Toggle menu"
                style={{ padding: '4px' }}
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── MOBILE FULL-SCREEN MENU OVERLAY (Tom Ford style) ─── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          background: '#fff',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Mobile Overlay Top Bar */}
        <div
          style={{
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            flexShrink: 0,
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#000',
              textTransform: 'uppercase',
            }}
          >
            MONZATO
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#000',
              padding: '4px',
            }}
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav style={{ flex: 1, padding: '24px 24px 0' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { handleNavClick(e, link.href); setMobileMenuOpen(false); }}
              style={{
                display: 'block',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: '#000',
                textDecoration: 'none',
                textTransform: 'uppercase',
                padding: '14px 0',
                borderBottom: '1px solid #f0f0f0',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            style={{
              display: 'block',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#000',
              textDecoration: 'none',
              textTransform: 'uppercase',
              padding: '14px 0',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            MONZATO BEAUTY &gt;
          </a>
        </nav>

        {/* Mobile Utility Links */}
        <div style={{ padding: '24px', borderTop: '1px solid #e5e5e5', marginTop: '24px' }}>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (user) { setActivePage('account'); setActiveAccountTab('dashboard'); }
              else setIsAuthModalOpen(true);
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#000',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            {user ? `MY ACCOUNT (${user.firstName})` : 'SIGN IN'}
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); setActivePage('cart'); }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#000',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px 0',
            }}
          >
            SHOPPING BAG ({totalItemsCount})
          </button>
        </div>

        {/* Mobile Region Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e5e5' }}>
          <span style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#000',
            textTransform: 'uppercase',
            textDecoration: 'underline',
            textDecorationColor: '#000',
          }}>
            INDIA / INR
          </span>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 59,
            background: 'rgba(0,0,0,0.4)',
          }}
        />
      )}
    </>
  );
};
