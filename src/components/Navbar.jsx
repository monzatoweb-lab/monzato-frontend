import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, User, ShoppingBag, X, ChevronRight, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

/* ─── Mega-menu data: Brioni style ─────────────────────────────── */
const NAV_ITEMS = [
  {
    name: "NEW ARRIVALS",
    href: "#products",
    columns: [
      {
        heading: "What's New",
        links: [
          { label: "New In Suits", href: "#products" },
          { label: "New In Shirts", href: "#products" },
          { label: "Exclusive Drops", href: "#products" },
          { label: "Limited Editions", href: "#products" },
        ],
      },
      {
        heading: "Collections",
        links: [
          { label: "Spring / Summer", href: "#products" },
          { label: "Autumn / Winter", href: "#products" },
          { label: "Resort Collection", href: "#products" },
        ],
      },
    ],
    featuredImage: "/images/hero_chartreuse.jpg",
    featuredLabel: "New Season",
    featuredCaption: "Discover the latest arrivals",
  },
  {
    name: "SUITS",
    href: "#products",
    columns: [
      {
        heading: "By Style",
        links: [
          { label: "Single-Breasted", href: "#products" },
          { label: "Double-Breasted", href: "#products" },
          { label: "Three-Piece", href: "#products" },
          { label: "Tuxedo", href: "#products" },
        ],
      },
      {
        heading: "By Fabric",
        links: [
          { label: "Super 150s Wool", href: "#products" },
          { label: "Cashmere Blend", href: "#products" },
          { label: "Silk-Wool", href: "#products" },
          { label: "Linen", href: "#products" },
        ],
      },
      {
        heading: "Services",
        links: [
          { label: "Made to Measure", href: "#tailored" },
          { label: "Bespoke Tailoring", href: "#tailored" },
        ],
      },
    ],
    featuredImage: "/images/suit_blue.jpg",
    featuredLabel: "Bespoke Suits",
    featuredCaption: "Crafted to perfection",
  },
  {
    name: "SHIRTS",
    href: "#products",
    columns: [
      {
        heading: "Dress Shirts",
        links: [
          { label: "Classic Fit", href: "#products" },
          { label: "Slim Fit", href: "#products" },
          { label: "French Cuff", href: "#products" },
        ],
      },
      {
        heading: "Casual Shirts",
        links: [
          { label: "Linen Shirts", href: "#products" },
          { label: "Oxford Shirts", href: "#products" },
          { label: "Polo Shirts", href: "#products" },
        ],
      },
    ],
    featuredImage: "/images/suit_chartreuse.jpg",
    featuredLabel: "Custom Shirts",
    featuredCaption: "Your fabric, your fit",
  },
  {
    name: "OUTERWEAR",
    href: "#tailored",
    columns: [
      {
        heading: "Coats",
        links: [
          { label: "Overcoats", href: "#tailored" },
          { label: "Topcoats", href: "#tailored" },
          { label: "Trench Coats", href: "#tailored" },
        ],
      },
      {
        heading: "Jackets",
        links: [
          { label: "Sport Coats", href: "#tailored" },
          { label: "Blazers", href: "#tailored" },
          { label: "Field Jackets", href: "#tailored" },
        ],
      },
    ],
    featuredImage: "/images/suit_saffron.jpg",
    featuredLabel: "Winter Edit",
    featuredCaption: "Outerwear essentials",
  },
  {
    name: "ACCESSORIES",
    href: "#accessories",
    columns: [
      {
        heading: "Neckwear",
        links: [
          { label: "Silk Ties", href: "#accessories" },
          { label: "Pocket Squares", href: "#accessories" },
          { label: "Bow Ties", href: "#accessories" },
        ],
      },
      {
        heading: "More",
        links: [
          { label: "Belts", href: "#accessories" },
          { label: "Cufflinks", href: "#accessories" },
          { label: "Sunglasses", href: "#accessories" },
        ],
      },
    ],
    featuredImage: "/images/suit_purple.jpg",
    featuredLabel: "Accessories",
    featuredCaption: "The finishing touch",
  },
];

const TF = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* ─────────────────────────────────────────────────────────────── */
export const Navbar = () => {
  const {
    totalItemsCount, setIsCartOpen, isSearchOpen, setIsSearchOpen,
    searchQuery, setSearchQuery, setQuickViewProduct, openProductDetails,
    activePage, setActivePage, setActiveAccountTab, user,
    setIsAuthModalOpen, logoutUser,
  } = useCart();

  const [isScrolled, setIsScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [searchExpanded, setSearchExpanded]   = useState(false);
  const [activeDropdown, setActiveDropdown]   = useState(null);   // nav item name
  const [mobileExpanded, setMobileExpanded]   = useState(null);   // mobile accordion
  const dropdownTimer = useRef(null);
  const searchInputRef = useRef(null);

  /* scroll */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* body lock */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  /* search focus */
  useEffect(() => {
    if (searchExpanded && searchInputRef.current)
      setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchExpanded]);

  const profileMenuItems = [
    { label: "Dashboard",        tab: "dashboard" },
    { label: "Orders",           tab: "orders" },
    { label: "Addresses",        tab: "addresses" },
    { label: "Account Details",  tab: "account-details" },
    { label: "Wishlist",         tab: "wishlist" },
  ];

  const filteredProducts = searchQuery.trim() === ""
    ? []
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (activePage !== "home") {
      setActivePage("home");
      setTimeout(() => {
        const el = document.getElementById(href.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchClose = () => {
    setSearchExpanded(false);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  /* Dropdown hover with delay to prevent jitter */
  const openDropdown  = (name) => { clearTimeout(dropdownTimer.current); setActiveDropdown(name); };
  const closeDropdown = ()     => { dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120); };

  return (
    <>
      <style>{`
        .brioni-dd-enter { animation: brioniSlideIn 0.22s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes brioniSlideIn {
          from { opacity:0; transform: translateY(-8px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .brioni-link {
          display: block;
          font-family: ${TF};
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #ccc;
          text-transform: uppercase;
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.15s;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          width: 100%;
        }
        .brioni-link:hover { color: #fff; }
        .brioni-col-head {
          font-family: ${TF};
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #555;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .mob-link {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%;
          font-family: ${TF};
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #000;
          text-transform: uppercase;
          background: none;
          border: none;
          border-bottom: 1px solid #f0f0f0;
          padding: 16px 0;
          cursor: pointer;
          transition: opacity 0.2s;
          text-align: left;
        }
        .mob-link:hover { opacity: 0.5; }
        .mob-sub-link {
          display: block;
          font-family: ${TF};
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: #333;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid #f7f7f7;
          transition: opacity 0.2s;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }
        .mob-sub-link:hover { opacity: 0.5; }
      `}</style>

      {/* ─── HEADER ─── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#fff",
          height: "72px",
          borderBottom: isScrolled ? "none" : "1px solid #e5e5e5",
          boxShadow: isScrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 32px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* LOGO */}
          <button
            onClick={() => { setActivePage("home"); setMobileMenuOpen(false); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
            aria-label="MONZATO Home"
          >
            <span style={{ fontFamily: TF, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 700, letterSpacing: "0.14em", color: "#000", textTransform: "uppercase", lineHeight: 1 }}>
              MONZATO
            </span>
          </button>

          {/* CENTER NAV — desktop */}
          {!searchExpanded && (
            <nav style={{ display: "none" }} className="brioni-desktop-nav">
              {/* rendered via CSS below */}
            </nav>
          )}

          {/* Desktop nav (inline) */}
          {!searchExpanded && (
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2.4rem",
              }}
              className="hidden lg:flex"
            >
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.name}
                  style={{ position: "relative" }}
                  onMouseEnter={() => openDropdown(item.name)}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: TF,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: activeDropdown === item.name ? "#000" : "#000",
                      textTransform: "uppercase",
                      padding: "4px 0",
                      position: "relative",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    {item.name}
                    {/* Active underline */}
                    {activeDropdown === item.name && (
                      <span style={{ position: "absolute", bottom: "-2px", left: 0, right: 0, height: "1px", background: "#000" }} />
                    )}
                  </button>
                </div>
              ))}
            </nav>
          )}

          {/* RIGHT ICONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.4rem" }}>

            {/* Search */}
            {!searchExpanded ? (
              <button onClick={() => setSearchExpanded(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#000", display: "flex", alignItems: "center" }} aria-label="Search">
                <Search size={20} strokeWidth={1.5} />
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #000", gap: 8, minWidth: 280, paddingBottom: 2 }}>
                <Search size={16} strokeWidth={1.5} style={{ color: "#000", flexShrink: 0 }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="ENTER KEYWORD OR ITEM NO."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(!!e.target.value); }}
                  style={{ fontFamily: TF, fontSize: "11px", letterSpacing: "0.1em", color: "#000", background: "transparent", border: "none", outline: "none", flex: 1, textTransform: "uppercase" }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} style={{ fontFamily: TF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#000", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase", flexShrink: 0 }}>CLEAR</button>
                )}
                <button onClick={handleSearchClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#000", padding: 2 }} aria-label="Close search">
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}

            {/* Search Results */}
            {searchExpanded && isSearchOpen && searchQuery.trim() !== "" && (
              <div style={{ position: "absolute", top: "72px", left: 0, right: 0, background: "#fff", borderTop: "1px solid #e5e5e5", padding: "24px 40px", maxHeight: "60vh", overflowY: "auto", zIndex: 60, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                <div style={{ fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#999", textTransform: "uppercase", marginBottom: 16 }}>
                  {filteredProducts.length} RESULTS FOR &ldquo;{searchQuery.toUpperCase()}&rdquo;
                </div>
                {filteredProducts.length === 0 ? (
                  <p style={{ fontFamily: TF, fontSize: "12px", color: "#666", textAlign: "center", padding: "24px 0" }}>No products found matching &ldquo;{searchQuery}&rdquo;</p>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 24 }}>
                    {filteredProducts.map(p => (
                      <div key={p.id} onClick={() => { openProductDetails(p); handleSearchClose(); }} style={{ cursor: "pointer" }}>
                        <div style={{ aspectRatio: "3/4", background: "#f5f5f5", overflow: "hidden", marginBottom: 8 }}>
                          <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                        </div>
                        <p style={{ fontFamily: TF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#000", textTransform: "uppercase", marginBottom: 2 }}>{p.name}</p>
                        <p style={{ fontFamily: TF, fontSize: "11px", color: "#555" }}>{p.formattedPrice}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Account — desktop */}
            {!searchExpanded && (
              <div className="hidden lg:block" style={{ position: "relative" }} onMouseEnter={() => setIsProfileHovered(true)} onMouseLeave={() => setIsProfileHovered(false)}>
                <button
                  onClick={() => { if (user) { setActivePage("account"); setActiveAccountTab("dashboard"); } else setIsAuthModalOpen(true); }}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#000", display: "flex" }}
                  aria-label="Account"
                >
                  <User size={20} strokeWidth={1.5} />
                </button>
                {isProfileHovered && user && (
                  <div className="brioni-dd-enter" style={{ position: "absolute", right: 0, top: "calc(100% + 12px)", minWidth: 220, background: "#fff", border: "1px solid #e5e5e5", boxShadow: "0 12px 32px rgba(0,0,0,0.12)", zIndex: 60 }}>
                    <div style={{ padding: "12px 20px 10px", borderBottom: "1px solid #f0f0f0" }}>
                      <p style={{ fontFamily: TF, fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", color: "#999", textTransform: "uppercase", marginBottom: 3 }}>SIGNED IN AS</p>
                      <p style={{ fontFamily: TF, fontSize: "12px", fontWeight: 700, color: "#000", letterSpacing: "0.05em" }}>{user.firstName} {user.lastName}</p>
                    </div>
                    {user.role === "admin" && (
                      <a href="http://localhost:5174" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#92400e", background: "#fffbeb", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid #fde68a" }}>
                        <span>👑 ADMIN</span><ChevronRight size={11} />
                      </a>
                    )}
                    {profileMenuItems.map(item => (
                      <button key={item.tab} onClick={() => { setActivePage("account"); setActiveAccountTab(item.tab); setIsProfileHovered(false); }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "9px 20px", fontFamily: TF, fontSize: "10px", fontWeight: 400, letterSpacing: "0.12em", color: "#333", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"} onMouseLeave={e => e.currentTarget.style.background = "none"}
                      >
                        <span>{item.label}</span><ChevronRight size={10} style={{ opacity: 0.4 }} />
                      </button>
                    ))}
                    <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 4, paddingTop: 4 }}>
                      <button onClick={() => { logoutUser(); setIsProfileHovered(false); }}
                        style={{ width: "100%", textAlign: "left", padding: "9px 20px", fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#cc0000"} onMouseLeave={e => e.currentTarget.style.color = "#888"}
                      >SIGN OUT</button>
                    </div>
                  </div>
                )}
                {isProfileHovered && !user && (
                  <div className="brioni-dd-enter" style={{ position: "absolute", right: 0, top: "calc(100% + 12px)", minWidth: 200, background: "#fff", border: "1px solid #e5e5e5", boxShadow: "0 12px 32px rgba(0,0,0,0.12)", padding: 20, zIndex: 60 }}>
                    <p style={{ fontFamily: TF, fontSize: "11px", color: "#555", marginBottom: 12, letterSpacing: "0.04em", lineHeight: 1.5 }}>Sign in to manage your MONZATO account</p>
                    <button onClick={() => { setIsAuthModalOpen(true); setIsProfileHovered(false); }}
                      style={{ width: "100%", padding: "10px", background: "#000", color: "#fff", fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", border: "none", cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#333"} onMouseLeave={e => e.currentTarget.style.background = "#000"}
                    >SIGN IN / REGISTER</button>
                  </div>
                )}
              </div>
            )}

            {/* Shopping Bag */}
            {!searchExpanded && (
              <button onClick={() => setActivePage("cart")}
                style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4, color: "#000", display: "flex" }}
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItemsCount > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -6, background: "#000", color: "#fff", fontSize: "9px", fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItemsCount}</span>
                )}
              </button>
            )}

            {/* Beauty link */}
            {!searchExpanded && (
              <a href="#" className="hidden xl:block" style={{ fontFamily: TF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#000", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", paddingLeft: 16, borderLeft: "1px solid #ddd", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.5"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >MONZATO BEAUTY &gt;</a>
            )}

            {/* Hamburger — mobile */}
            {!searchExpanded && (
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#000", display: "flex" }} aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : (
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                    <line x1="0" y1="1" x2="22" y2="1" stroke="#000" strokeWidth="1.5"/>
                    <line x1="0" y1="7" x2="22" y2="7" stroke="#000" strokeWidth="1.5"/>
                    <line x1="0" y1="13" x2="22" y2="13" stroke="#000" strokeWidth="1.5"/>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── BRIONI MEGA DROPDOWN — full width dark panel ─── */}
      {NAV_ITEMS.map(item => (
        <div
          key={item.name}
          onMouseEnter={() => openDropdown(item.name)}
          onMouseLeave={closeDropdown}
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            zIndex: 49,
            background: "#111",
            borderTop: "1px solid #222",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            pointerEvents: activeDropdown === item.name ? "auto" : "none",
            opacity: activeDropdown === item.name ? 1 : 0,
            transform: activeDropdown === item.name ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)",
          }}
          aria-hidden={activeDropdown !== item.name}
        >
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "44px 48px", display: "grid", gridTemplateColumns: `repeat(${item.columns.length},1fr) 280px`, gap: "0 48px" }}>
            {/* Text columns */}
            {item.columns.map((col, ci) => (
              <div key={ci}>
                <p className="brioni-col-head">{col.heading}</p>
                <div>
                  {col.links.map(link => (
                    <button key={link.label} className="brioni-link" onClick={(e) => handleNavClick(e, link.href)}>
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {/* Featured Image column */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={item.featuredImage}
                alt={item.featuredLabel}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)", padding: "24px 16px 14px" }}>
                <p style={{ fontFamily: TF, fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", color: "#aaa", textTransform: "uppercase", marginBottom: 4 }}>{item.featuredLabel}</p>
                <p style={{ fontFamily: TF, fontSize: "13px", fontWeight: 400, letterSpacing: "0.06em", color: "#fff" }}>{item.featuredCaption}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dropdown backdrop */}
      {activeDropdown && (
        <div
          onClick={() => setActiveDropdown(null)}
          style={{ position: "fixed", inset: 0, zIndex: 48, background: "rgba(0,0,0,0.35)", top: "72px" }}
        />
      )}

      {/* ─── MOBILE FULL-SCREEN MENU ─── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "#fff",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Mobile top bar */}
        <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, borderBottom: "1px solid #e5e5e5" }}>
          <span style={{ fontFamily: TF, fontSize: 20, fontWeight: 700, letterSpacing: "0.14em", color: "#000", textTransform: "uppercase" }}>MONZATO</span>
          <button onClick={() => setMobileMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }} aria-label="Close menu">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile nav accordion */}
        <nav style={{ flex: 1, padding: "0 24px", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => (
            <div key={item.name} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <button
                className="mob-link"
                style={{ borderBottom: "none" }}
                onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
              >
                <span>{item.name}</span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  style={{
                    transition: "transform 0.25s",
                    transform: mobileExpanded === item.name ? "rotate(180deg)" : "rotate(0deg)",
                    color: "#000",
                    flexShrink: 0,
                  }}
                />
              </button>
              {/* Accordion body */}
              <div
                style={{
                  maxHeight: mobileExpanded === item.name ? "600px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.32s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div style={{ paddingBottom: 16 }}>
                  {item.columns.map((col, ci) => (
                    <div key={ci} style={{ marginTop: 16 }}>
                      <p style={{ fontFamily: TF, fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", color: "#999", textTransform: "uppercase", marginBottom: 8 }}>{col.heading}</p>
                      {col.links.map(link => (
                        <button key={link.label} className="mob-sub-link" onClick={(e) => handleNavClick(e, link.href)}>
                          {link.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Beauty */}
          <a href="#" style={{ display: "flex", alignItems: "center", fontFamily: TF, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "#000", textTransform: "uppercase", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid #f0f0f0" }}>
            MONZATO BEAUTY &gt;
          </a>
        </nav>

        {/* Mobile utility */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid #e5e5e5" }}>
          <button className="mob-link" style={{ fontSize: 13, fontWeight: 400 }}
            onClick={() => { setMobileMenuOpen(false); if (user) { setActivePage("account"); setActiveAccountTab("dashboard"); } else setIsAuthModalOpen(true); }}
          >
            <span>{user ? `MY ACCOUNT (${user.firstName})` : "SIGN IN"}</span>
          </button>
          <button className="mob-link" style={{ fontSize: 13, fontWeight: 400, borderBottom: "none" }}
            onClick={() => { setMobileMenuOpen(false); setActivePage("cart"); }}
          >
            <span>SHOPPING BAG ({totalItemsCount})</span>
          </button>
        </div>

        <div style={{ padding: "14px 24px", borderTop: "1px solid #e5e5e5" }}>
          <span style={{ fontFamily: TF, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#000", textTransform: "uppercase", textDecoration: "underline" }}>INDIA / INR</span>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 59, background: "rgba(0,0,0,0.4)" }} />
      )}
    </>
  );
};
