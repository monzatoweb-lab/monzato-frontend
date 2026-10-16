import React, { useState } from "react";
import { Heart, ShoppingBag, ChevronDown, ChevronUp, ArrowLeft, Star, Check, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const TF = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SUIT_SIZES = ["36", "38", "40", "42", "44", "46", "48", "50"];

/* Accordion row */
const Accordion = ({ label, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: "1px solid #e8e8e8" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: TF,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#000",
        }}
      >
        <span>{label}</span>
        {open ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
      </button>
      <div
        style={{
          maxHeight: open ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ paddingBottom: 18 }}>{children}</div>
      </div>
    </div>
  );
};

export const ProductDetailPage = () => {
  const {
    selectedProduct, products, addToCart, setIsCartOpen,
    setActivePage, wishlist, toggleWishlist, showToast, user,
  } = useCart();

  const product = selectedProduct || products[0] || {
    id: "deep-river-suit",
    name: "Deep River Suit",
    category: "SUITS",
    price: 1640.00,
    formattedPrice: "$1,640.00",
    image: "/images/suit_blue.jpg",
    hoverImage: "/images/suit_chartreuse.jpg",
    color: "Electric Royal Blue",
    fit: "Modern Slim Tailored",
    material: "100% Super 150s Italian Wool",
    description: "Masterfully crafted in Italy, the Deep River Suit features a vibrant royal blue tone with peak lapels, horn buttons, and handcrafted shoulder stitching for an impeccable silhouette.",
  };

  const isSuit = product.category?.toUpperCase() === "SUITS";
  const sizeOptions = isSuit ? SUIT_SIZES : SIZES;

  const pId = product.id || product._id || product.slug;
  const isWishlisted = wishlist?.includes(pId);

  const galleryImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image, product.hoverImage].filter(Boolean);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  /* Reviews */
  const [reviews] = useState([
    { id: 1, author: "Derek A.", rating: 5, comment: "The deep river suit is extremely well made. The stitching is clean all around and the seams are reinforced nicely.", date: "2 weeks ago" },
    { id: 2, author: "Marcus V.", rating: 5, comment: "Phenomenal tailoring and Italian wool quality. Fits true to size and looks magnificent.", date: "1 month ago" },
    { id: 3, author: "Julian R.", rating: 5, comment: "Impeccable silhouette. Received countless compliments at the evening gala.", date: "2 months ago" },
  ]);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart(product, selectedSize);
    setAddedFlash(true);
    setTimeout(() => { setAddedFlash(false); setIsCartOpen(true); }, 800);
  };

  const relatedProducts = products.filter(p => (p.id || p._id) !== pId).slice(0, 4);

  return (
    <>
      <style>{`
        .pdp-grid { display: grid; grid-template-columns: 260px 1fr 340px; gap: 0; min-height: 80vh; }
        .pdp-thumb-strip { display: flex; flex-direction: column; gap: 8px; padding: 0 16px 0 0; }
        .pdp-thumb { width: 60px; height: 72px; object-fit: cover; background: #f2f2f2; cursor: pointer; border: 1.5px solid transparent; transition: border-color 0.2s; flex-shrink: 0; }
        .pdp-thumb.active { border-color: #000; }
        .pdp-main-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; background: #f2f2f2; display: block; cursor: zoom-in; transition: transform 0.5s ease; }
        .pdp-main-img:hover { transform: scale(1.02); }
        .pdp-right { padding: 0 0 0 clamp(24px, 3vw, 52px); position: sticky; top: 80px; align-self: start; }
        .pdp-size-btn {
          padding: 10px 0;
          font-family: ${TF};
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid #d0d0d0;
          background: #fff;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
          color: #000;
        }
        .pdp-size-btn:hover { border-color: #000; }
        .pdp-size-btn.selected { background: #000; color: #fff; border-color: #000; font-weight: 700; }
        .pdp-add-btn {
          width: 100%;
          padding: 16px;
          background: #000;
          color: #fff;
          font-family: ${TF};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s;
        }
        .pdp-add-btn:hover { background: #1a1a1a; }
        .pdp-add-btn.flash { background: #1a5c2a; }
        .pdp-left-info { padding: 0 clamp(20px, 2.5vw, 40px) 0 0; }
        .related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(12px, 1.5vw, 24px); }
        .related-card { cursor: pointer; }
        .related-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; background: #f2f2f2; display: block; transition: transform 0.4s; }
        .related-card:hover .related-img { transform: scale(1.03); }

        /* Lightbox */
        .lb-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 100; display: flex; align-items: center; justify-content: center; }
        .lb-img { max-height: 90vh; max-width: 90vw; object-fit: contain; }

        /* Mobile */
        @media (max-width: 900px) {
          .pdp-grid { grid-template-columns: 1fr; }
          .pdp-thumb-strip { flex-direction: row; padding: 8px 0 0 0; justify-content: center; }
          .pdp-right { position: static; padding: 24px 0 0 0; }
          .pdp-left-info { padding: 0 0 20px 0; border-bottom: 1px solid #eee; margin-bottom: 20px; }
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div style={{ background: "#fff", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(20px,3vw,40px) clamp(20px,4vw,60px)" }}>

          {/* Back */}
          <button
            onClick={() => setActivePage("home")}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#000", marginBottom: 32, padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.5"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Collection
          </button>

          {/* ── MAIN 3-COL LAYOUT ── */}
          <div className="pdp-grid">

            {/* COL 1: Left info panel */}
            <div className="pdp-left-info">
              <p style={{ fontFamily: TF, fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", color: "#999", textTransform: "uppercase", marginBottom: 10 }}>
                {product.category || "SUITS"}
              </p>
              <h1 style={{ fontFamily: TF, fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#000", margin: "0 0 10px 0", lineHeight: 1.2 }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: TF, fontSize: "clamp(14px,1.4vw,17px)", fontWeight: 400, letterSpacing: "0.04em", color: "#000", marginBottom: 20 }}>
                {product.formattedPrice || `$${Number(product.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
              </p>
              <p style={{ fontFamily: TF, fontSize: "12px", fontWeight: 400, letterSpacing: "0.03em", color: "#555", lineHeight: 1.8, marginBottom: 24 }}>
                {product.description || "Masterfully crafted from superfine Italian wool, this suit embodies fluid sophistication with sculpted shoulders and defined lapels."}
              </p>

              {/* Accordions in left panel */}
              <Accordion label="Details" defaultOpen>
                <div style={{ fontFamily: TF, fontSize: "11px", color: "#555", lineHeight: 2, letterSpacing: "0.04em" }}>
                  <p>• <strong style={{ color: "#000" }}>Material:</strong> {product.material || "100% Super 150s Italian Wool"}</p>
                  <p>• <strong style={{ color: "#000" }}>Fit:</strong> {product.fit || "Modern Slim Tailored"}</p>
                  <p>• <strong style={{ color: "#000" }}>Color:</strong> {product.color || "Classic"}</p>
                  <p>• <strong style={{ color: "#000" }}>Lining:</strong> 100% Cupro Silk</p>
                  <p>• <strong style={{ color: "#000" }}>Origin:</strong> Made in Italy</p>
                </div>
              </Accordion>
              <Accordion label="Care Instructions">
                <div style={{ fontFamily: TF, fontSize: "11px", color: "#555", lineHeight: 2, letterSpacing: "0.04em" }}>
                  <p>• Specialist dry clean only</p>
                  <p>• Steam iron on low heat</p>
                  <p>• Store on wide wooden hanger</p>
                  <p>• Avoid direct sunlight</p>
                </div>
              </Accordion>
              <Accordion label="Shipping & Returns">
                <div style={{ fontFamily: TF, fontSize: "11px", color: "#555", lineHeight: 2, letterSpacing: "0.04em" }}>
                  <p>• Free standard shipping worldwide</p>
                  <p>• Express delivery available</p>
                  <p>• 30-day free returns</p>
                  <p>• Duty & taxes included</p>
                </div>
              </Accordion>
              <div style={{ height: 1, background: "#e8e8e8" }} />
            </div>

            {/* COL 2: Center — large image + thumbnail strip */}
            <div>
              {/* Main Image */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img
                  className="pdp-main-img"
                  src={galleryImages[activeImg] || product.image}
                  alt={product.name}
                  onClick={() => setLightbox(true)}
                />
                {/* Wishlist overlay */}
                <button
                  onClick={() => toggleWishlist(pId)}
                  style={{
                    position: "absolute", top: 16, right: 16,
                    background: "rgba(255,255,255,0.88)", border: "none", cursor: "pointer",
                    width: 40, height: 40, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                  aria-label="Wishlist"
                >
                  <Heart size={18} strokeWidth={1.5} fill={isWishlisted ? "#e00" : "none"} style={{ color: isWishlisted ? "#e00" : "#000" }} />
                </button>
                {/* Badge */}
                {(product.isNew || product.isBestseller || product.isFeatured) && (
                  <span style={{ position: "absolute", top: 16, left: 16, fontFamily: TF, fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", background: "#000", padding: "3px 10px" }}>
                    {product.isNew ? "New" : product.isBestseller ? "Bestseller" : "Featured"}
                  </span>
                )}
              </div>

              {/* Thumbnail strip */}
              {galleryImages.length > 1 && (
                <div className="pdp-thumb-strip" style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                  {galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`View ${i + 1}`}
                      className={`pdp-thumb${activeImg === i ? " active" : ""}`}
                      onClick={() => setActiveImg(i)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* COL 3: Right purchase panel */}
            <div className="pdp-right">

              {/* Size Guide link */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <p style={{ fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#000" }}>
                  Select Your Size
                </p>
                <button
                  onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: TF, fontSize: "10px", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000", textDecoration: "underline" }}
                >
                  Size Guide
                </button>
              </div>

              {/* Size guide panel */}
              {sizeGuideOpen && (
                <div style={{ background: "#f9f9f9", border: "1px solid #e8e8e8", padding: "14px 16px", marginBottom: 14 }}>
                  <p style={{ fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000", marginBottom: 8 }}>Standard Sizing</p>
                  {isSuit ? (
                    [["36", "36\" Chest / 30\" Waist"], ["38", "38\" Chest / 32\" Waist"], ["40", "40\" Chest / 34\" Waist"], ["42", "42\" Chest / 36\" Waist"], ["44", "44\" Chest / 38\" Waist"]].map(([s, d]) => (
                      <p key={s} style={{ fontFamily: TF, fontSize: "10px", color: "#555", lineHeight: 1.8 }}><strong>{s}:</strong> {d}</p>
                    ))
                  ) : (
                    [["XS", "Chest 34-36\""], ["S", "Chest 36-38\""], ["M", "Chest 38-40\""], ["L", "Chest 40-42\""], ["XL", "Chest 42-44\""], ["XXL", "Chest 44-46\""]].map(([s, d]) => (
                      <p key={s} style={{ fontFamily: TF, fontSize: "10px", color: "#555", lineHeight: 1.8 }}><strong>{s}:</strong> {d}</p>
                    ))
                  )}
                  <p style={{ fontFamily: TF, fontSize: "9px", color: "#999", marginTop: 6, fontStyle: "italic" }}>Model is 6'1" wearing size L</p>
                </div>
              )}

              {/* Fit hint */}
              <p style={{ fontFamily: TF, fontSize: "10px", color: "#777", letterSpacing: "0.04em", marginBottom: 16, lineHeight: 1.6 }}>
                Tailored fit — select your normal size.
              </p>

              {/* Size buttons */}
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(sizeOptions.length, 6)}, 1fr)`, gap: "6px", marginBottom: 8 }}>
                {sizeOptions.map(s => (
                  <button
                    key={s}
                    className={`pdp-size-btn${selectedSize === s ? " selected" : ""}`}
                    onClick={() => { setSelectedSize(s); setSizeError(false); }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p style={{ fontFamily: TF, fontSize: "10px", color: "#e00", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                  Please select a size
                </p>
              )}

              {/* Add to Bag */}
              <button
                className={`pdp-add-btn${addedFlash ? " flash" : ""}`}
                onClick={handleAddToCart}
                style={{ marginTop: 16 }}
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                {addedFlash ? "Added to Bag ✓" : "Add to Bag"}
              </button>

              {/* Wishlist text link */}
              <button
                onClick={() => toggleWishlist(pId)}
                style={{ width: "100%", marginTop: 10, background: "none", border: "1px solid #d0d0d0", padding: "12px 0", cursor: "pointer", fontFamily: TF, fontSize: "10px", fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#000"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#d0d0d0"}
              >
                <Heart size={14} strokeWidth={1.5} fill={isWishlisted ? "#e00" : "none"} style={{ color: isWishlisted ? "#e00" : "#000" }} />
                {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
              </button>

              {/* Shipping note */}
              <div style={{ marginTop: 24, borderTop: "1px solid #e8e8e8", paddingTop: 20 }}>
                <p style={{ fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#000", marginBottom: 8 }}>
                  Shipping & Returns
                  <span style={{ float: "right", fontWeight: 400, fontSize: 14 }}>∧</span>
                </p>
                <p style={{ fontFamily: TF, fontSize: "10px", color: "#555", lineHeight: 1.8, letterSpacing: "0.04em" }}>
                  Free International Shipping<br />
                  Duty & Taxes Included<br />
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>View shipping & returns</span>
                </p>
              </div>

              {/* Reviews summary */}
              <div style={{ marginTop: 24, borderTop: "1px solid #e8e8e8", paddingTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#000" style={{ color: "#000" }} />)}
                  <span style={{ fontFamily: TF, fontSize: "10px", letterSpacing: "0.1em", color: "#000" }}>({reviews.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── REVIEWS ── */}
          <div style={{ borderTop: "1px solid #e8e8e8", marginTop: 64, paddingTop: 48 }}>
            <p style={{ fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#000", marginBottom: 32 }}>
              Client Reviews
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
              {reviews.map(rev => (
                <div key={rev.id} style={{ borderTop: "1px solid #e8e8e8", paddingTop: 20 }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="#000" style={{ color: "#000" }} />)}
                  </div>
                  <p style={{ fontFamily: TF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000", marginBottom: 6 }}>
                    {rev.author} <span style={{ fontWeight: 400, color: "#4a9" }}>✓ Verified</span>
                  </p>
                  <p style={{ fontFamily: TF, fontSize: "11px", color: "#555", lineHeight: 1.8, fontStyle: "italic" }}>"{rev.comment}"</p>
                  <p style={{ fontFamily: TF, fontSize: "9px", color: "#bbb", marginTop: 8, letterSpacing: "0.08em" }}>{rev.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── YOU MAY ALSO LIKE ── */}
          {relatedProducts.length > 0 && (
            <div style={{ borderTop: "1px solid #e8e8e8", marginTop: 64, paddingTop: 48 }}>
              <p style={{ fontFamily: TF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#000", marginBottom: 32 }}>
                You May Also Like
              </p>
              <div className="related-grid">
                {relatedProducts.map(rp => {
                  const rpId = rp.id || rp._id;
                  return (
                    <div key={rpId} className="related-card" onClick={() => { /* open product */ }}>
                      <div style={{ overflow: "hidden", marginBottom: 12 }}>
                        <img className="related-img" src={rp.image} alt={rp.name} />
                      </div>
                      <p style={{ fontFamily: TF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000", marginBottom: 4 }}>{rp.name}</p>
                      <p style={{ fontFamily: TF, fontSize: "11px", color: "#555" }}>{rp.formattedPrice}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lb-overlay" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
            <X size={28} strokeWidth={1} />
          </button>
          <img className="lb-img" src={galleryImages[activeImg] || product.image} alt={product.name} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};
