import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
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
    : PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleNavClick = (e, href) => {
    e.preventDefault();
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

  return (
    <header className={`sticky top-0 z-40 bg-white transition-all duration-300 border-b border-neutral-100 ${
      isScrolled ? 'shadow-sm py-3' : 'py-4 lg:py-5'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-neutral-800 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <button 
            onClick={() => setActivePage('home')} 
            className="flex items-center text-left focus:outline-none"
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.18em] text-neutral-950 font-serif-luxury uppercase">
              MONZATO
            </span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-10 xl:space-x-14">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[13px] font-semibold tracking-[0.18em] text-neutral-800 hover:text-neutral-500 transition-colors uppercase py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neutral-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Search, Account with Hover Dropdown, Bag */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Search Box */}
          <div className="relative hidden sm:flex items-center border-b border-neutral-300 pb-0.5 hover:border-neutral-900 transition-colors">
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value && !isSearchOpen) setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-28 xl:w-36 text-[11px] font-medium tracking-[0.15em] bg-transparent text-neutral-900 placeholder-neutral-400 focus:outline-none uppercase"
            />
            <button 
              type="button" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-neutral-800 hover:text-black transition-colors pl-1"
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.8} />
            </button>

            {/* Live Search Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-neutral-200 shadow-xl rounded-none p-4 z-50">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-100 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Search Results ({filteredProducts.length})</span>
                  <button onClick={() => setSearchQuery('')} className="text-[10px] text-neutral-500 hover:text-black">Clear</button>
                </div>
                {filteredProducts.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-3 text-center">No products found matching "{searchQuery}"</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {filteredProducts.map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => {
                          openProductDetails(p);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-1.5 hover:bg-neutral-50 cursor-pointer transition-colors"
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover bg-neutral-100" />
                        <div>
                          <h4 className="text-xs font-semibold text-neutral-900">{p.name}</h4>
                          <p className="text-[11px] text-neutral-500">{p.formattedPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Icon */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="sm:hidden text-neutral-800 hover:text-black transition-colors p-1"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* USER PROFILE WITH HOVER DROPDOWN (Screenshot 3 & 4) */}
          <div 
            className="relative"
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
              className="text-neutral-800 hover:text-black transition-colors p-1 relative flex items-center"
              aria-label="Account"
              title={user ? `Logged in as ${user.firstName}` : 'Login / Register'}
            >
              <User size={21} strokeWidth={1.8} />
            </button>

            {/* Profile Dropdown Popup on Hover (Screenshot 3 & 4) */}
            {isProfileHovered && user && (
              <div className="absolute right-0 top-full pt-2 z-50 w-56 animate-in fade-in duration-200">
                {/* Top Pointer Arrow (Triangle) */}
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[8px] border-b-white ml-auto mr-2.5 shadow-xs" />
                
                <div className="bg-white border border-neutral-200 shadow-xl py-2 px-1">
                  <div className="px-4 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">LOGGED IN AS</p>
                    <p className="text-xs font-bold text-neutral-900 truncate">{user.firstName} {user.lastName}</p>
                  </div>

                  <div className="space-y-0.5">
                    {user.role === 'admin' && (
                      <a
                        href="http://localhost:5174"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-left px-4 py-2 text-xs font-bold text-amber-600 bg-amber-50/80 hover:bg-amber-100 transition-colors uppercase tracking-wider flex items-center justify-between border-b border-amber-200/60 mb-1"
                      >
                        <span>👑 ADMIN DASHBOARD</span>
                        <ChevronRight size={12} />
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
                        className="w-full text-left px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-colors uppercase tracking-wider flex items-center justify-between group"
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}

                    <div className="border-t border-neutral-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsProfileHovered(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors uppercase tracking-wider"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Dropdown Popup on Hover when NOT Logged In */}
            {isProfileHovered && !user && (
              <div className="absolute right-0 top-full pt-2 z-50 w-52">
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[8px] border-b-white ml-auto mr-2.5" />
                <div className="bg-white border border-neutral-200 shadow-xl p-4 text-center">
                  <p className="text-xs font-medium text-neutral-600 mb-3">Sign in to manage your MONZATO account</p>
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsProfileHovered(false);
                    }}
                    className="w-full py-2 bg-neutral-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                  >
                    LOGIN / REGISTER
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Shopping Bag Icon with badge & Cart Page Trigger */}
          <button
            onClick={() => setActivePage('cart')}
            className="text-neutral-800 hover:text-black transition-colors p-1 relative flex items-center justify-center group"
            aria-label="Shopping bag"
            title="Shopping Bag"
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, link.href);
              }}
              className="block text-sm font-semibold tracking-widest text-neutral-900 hover:text-neutral-500 uppercase py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-neutral-100 flex flex-col space-y-2 text-xs text-neutral-600 font-medium">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (user) {
                  setActivePage('account');
                  setActiveAccountTab('dashboard');
                } else {
                  setIsAuthModalOpen(true);
                }
              }} 
              className="text-left py-1 font-bold uppercase hover:text-black"
            >
              {user ? `ACCOUNT (${user.firstName})` : 'LOGIN / REGISTER'}
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setActivePage('cart');
              }} 
              className="text-left py-1 font-bold uppercase hover:text-black"
            >
              SHOPPING BAG ({totalItemsCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
