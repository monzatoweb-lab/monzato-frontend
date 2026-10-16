import React, { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";

const TF = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const FILTERS = ["ALL", "SUITS", "SHIRTS", "OUTERWEAR", "ACCESSORIES"];

/* ── Individual Product Card (Belance style) ──────────────────── */
const ProductCard = ({ product, onDetails, onQuickView, onAddToCart, isWishlisted, onToggleWishlist }) => {
  const [hovered, setHovered] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1400);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div
        onClick={() => onDetails(product)}
        style={{
          position: "relative",
          background: "#f2f2f2",
          aspectRatio: "3/4",
          overflow: "hidden",
          marginBottom: "14px",
        }}
      >
        {/* Primary image */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "opacity 0.45s ease, transform 0.55s ease",
            opacity: hovered && product.hoverImage ? 0 : 1,
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
        {/* Hover image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={product.name + " alt"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "opacity 0.45s ease, transform 0.55s ease",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
        )}

        {/* NEW / BESTSELLER badge */}
        {(product.isNew || product.isBestseller || product.isFeatured) && (
          <span style={{
            position: "absolute",
            top: 14,
            left: 14,
            fontFamily: TF,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#000",
            padding: "3px 8px",
          }}>
            {product.isNew ? "New" : product.isBestseller ? "Bestseller" : "Featured"}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id || product._id || product.slug); }}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.88)",
            border: "none",
            cursor: "pointer",
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            transition: "opacity 0.2s, transform 0.2s",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.85)",
          }}
          aria-label="Wishlist"
        >
          <Heart size={16} strokeWidth={1.5} fill={isWishlisted ? "#e00" : "none"} style={{ color: isWishlisted ? "#e00" : "#000" }} />
        </button>

        {/* Bottom hover bar — Belance style */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          gap: 1,
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <button
            onClick={handleAdd}
            style={{
              flex: 1,
              padding: "12px 0",
              background: addedFlash ? "#1a1a1a" : "#000",
              color: "#fff",
              fontFamily: TF,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              transition: "background 0.2s",
            }}
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            {addedFlash ? "Added ✓" : "Add to Bag"}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            style={{
              width: 48,
              background: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              transition: "background 0.2s",
            }}
            aria-label="Quick view"
            onMouseEnter={e => e.currentTarget.style.background = "#f0f0f0"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <Eye size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Text info — Belance: all caps small, left-aligned */}
      <div onClick={() => onDetails(product)} style={{ paddingTop: "12px", paddingBottom: "16px" }}>
        <p style={{
          fontFamily: TF,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#000",
          textTransform: "uppercase",
          marginBottom: "6px",
          lineHeight: 1.4,
        }}>
          {product.name}
        </p>
        <p style={{
          fontFamily: TF,
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.06em",
          color: "#555",
          margin: 0,
          lineHeight: 1.4,
        }}>
          {product.formattedPrice || `$${Number(product.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        </p>
      </div>
    </div>
  );
};

/* ── Main Grid Section ──────────────────────────────────────────── */
export const ProductCarousel = () => {
  const { products, addToCart, wishlist, toggleWishlist, setQuickViewProduct, openProductDetails } = useCart();
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filtered = activeFilter === "ALL"
    ? products
    : products.filter(p => p.category?.toUpperCase() === activeFilter);

  return (
    <section
      id="products"
      style={{
        background: "#fff",
        padding: "clamp(48px,6vw,88px) 0",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(20px,4vw,60px)" }}>

        {/* ── Section Header ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(28px,3vw,44px)", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", color: "#999", textTransform: "uppercase", marginBottom: 8 }}>
              The Collection
            </p>
            <h2 style={{ fontFamily: TF, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 700, letterSpacing: "0.06em", color: "#000", textTransform: "uppercase", lineHeight: 1.1, margin: 0 }}>
              Shop All Products
            </h2>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: 0, border: "1px solid #e0e0e0", flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: TF,
                  fontSize: "10px",
                  fontWeight: activeFilter === f ? 700 : 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: activeFilter === f ? "#fff" : "#555",
                  background: activeFilter === f ? "#000" : "transparent",
                  border: "none",
                  borderRight: "1px solid #e0e0e0",
                  padding: "9px 18px",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── 3-Column Grid ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: TF, fontSize: "13px", letterSpacing: "0.1em", color: "#999", textTransform: "uppercase" }}>
            No products found
          </div>
        ) : (
          <div
            className="mz-product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "28px",
              rowGap: "48px",
            }}
          >
            {filtered.map(product => {
              const pId = product.id || product._id || product.slug;
              return (
                <ProductCard
                  key={pId}
                  product={product}
                  onDetails={openProductDetails}
                  onQuickView={setQuickViewProduct}
                  onAddToCart={addToCart}
                  isWishlisted={wishlist.includes(pId)}
                  onToggleWishlist={toggleWishlist}
                />
              );
            })}
          </div>
        )}

        {/* ── View All CTA ── */}
        <div style={{ textAlign: "center", marginTop: "clamp(48px,5vw,72px)" }}>
          <button
            style={{
              fontFamily: TF,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#000",
              background: "transparent",
              border: "1.5px solid #000",
              padding: "13px 40px",
              cursor: "pointer",
              transition: "background 0.22s, color 0.22s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#000"; }}
          >
            View All Products
          </button>
        </div>

        {/* Responsive: 1-col mobile, 2-col tablet, 4-col desktop */}
        <style>{`
          .mz-product-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 28px;
            row-gap: 48px;
          }
          @media (max-width: 480px) {
            .mz-product-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
          }
          @media (min-width: 481px) and (max-width: 860px) {
            .mz-product-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 18px !important;
              row-gap: 36px !important;
            }
          }
          @media (min-width: 861px) and (max-width: 1140px) {
            .mz-product-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 22px !important;
              row-gap: 40px !important;
            }
          }
          @media (min-width: 1141px) {
            .mz-product-grid {
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 28px !important;
              row-gap: 48px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
