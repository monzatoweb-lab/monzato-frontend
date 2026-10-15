import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, ShoppingBag, ArrowLeft, Check, ZoomIn, Film } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, Input, Modal, SectionHeader } from './common';

export const ProductDetailPage = () => {
  const {
    selectedProduct,
    products,
    addToCart,
    setIsCartOpen,
    setActivePage,
    user,
    showToast
  } = useCart();

  // Fallback to first product if none selected
  const product = selectedProduct || products[0] || {
    id: 'deep-river-suit',
    name: 'Deep River Suit',
    category: 'SUITS',
    price: 1640.00,
    formattedPrice: '$1,640.00',
    image: '/images/suit_blue.jpg',
    hoverImage: '/images/suit_chartreuse.jpg',
    color: 'Electric Royal Blue',
    fit: 'Modern Slim Tailored',
    material: '100% Super 150s Italian Wool',
    description: 'Tailored from superfine wool in an opulent deep river blue, this suit embodies fluid sophistication. The sculpted shoulders and defined peak lapels create a commanding silhouette, while the feather light weave moves with quiet ease. A masterclass in modern tailoring where depth of color meets precision craftsmanship.',
  };

  const sizes = ['34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54'];
  const [selectedSize, setSelectedSize] = useState('44');
  const [detailCareOpen, setDetailCareOpen] = useState(true);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  // Collect all gallery images & video
  const galleryList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [
        product.image || '/images/suit_blue.jpg',
        '/images/hero_chartreuse.jpg',
        product.hoverImage || '/images/suit_chartreuse.jpg',
      ].filter(Boolean);

  const videoUrl = product.video || null;

  // Reviews state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Derek',
      rating: 5,
      comment: 'The deep river suit is extremely well made. The stitching is clean all around and the seams are reinforced nicely.',
      date: '2 weeks ago',
    },
    {
      id: 2,
      author: 'Marcus V.',
      rating: 5,
      comment: 'Phenomenal tailoring and Italian wool quality. Fits true to size and looks magnificent.',
      date: '1 month ago',
    },
    {
      id: 3,
      author: 'Julian R.',
      rating: 5,
      comment: 'Impeccable silhouette. Received countless compliments at the evening gala.',
      date: '2 months ago',
    }
  ]);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingReview(true);

    setTimeout(() => {
      const added = {
        id: Date.now(),
        author: `${user?.firstName || 'Customer'} ${user?.lastName?.[0] || ''}.`,
        rating: Number(newRating),
        comment: newComment.trim(),
        date: 'Just now',
      };
      setReviews([added, ...reviews]);
      setNewComment('');
      setSubmittingReview(false);
      showToast('Thank you! Your review has been submitted.');
    }, 600);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsCartOpen(true);
  };

  const handleApplePay = () => {
    addToCart(product, selectedSize);
    setIsCartOpen(true);
    showToast('Redirecting to Apple Pay Checkout...');
  };

  return (
    <div className="bg-white text-neutral-900 min-h-screen py-6 sm:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100 text-xs tracking-widest text-neutral-500 uppercase font-medium">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              HOME
            </button>
            <span>/</span>
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {product.category || 'SUITS'}
            </button>
            <span>/</span>
            <span className="text-black font-semibold">{product.name}</span>
          </div>

          <Button
            variant="link"
            size="sm"
            icon={ArrowLeft}
            onClick={() => setActivePage('home')}
            className="hidden sm:inline-flex text-neutral-700 hover:text-black font-bold uppercase tracking-widest text-xs"
          >
            BACK TO COLLECTION
          </Button>
        </div>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          
          {/* LEFT COLUMN: Multi-Image & Video Gallery Grid (7 Cols) */}
          <div className="lg:col-span-7">
            
            {/* Grid of Images & Video */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Media Item 1: Studio Suit Photo */}
              <div 
                onClick={() => setZoomImage(galleryList[0] || product.image)}
                className="relative bg-[#f4f4f4] aspect-[4/5] overflow-hidden border border-neutral-100 group cursor-pointer"
              >
                <img
                  src={galleryList[0] || product.image}
                  alt={`${product.name} studio shot`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full shadow-sm text-neutral-800 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <ZoomIn size={16} />
                </div>
              </div>

              {/* Media Item 2: Video OR Model Campaign Shot */}
              {videoUrl ? (
                <div className="relative bg-black aspect-[4/5] overflow-hidden border border-neutral-100 group">
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm flex items-center gap-1">
                    <Film size={12} className="text-amber-400" /> CAMPAIGN VIDEO
                  </div>
                </div>
              ) : galleryList[1] ? (
                <div 
                  onClick={() => setZoomImage(galleryList[1])}
                  className="relative bg-[#f4f4f4] aspect-[4/5] overflow-hidden border border-neutral-100 group cursor-pointer"
                >
                  <img
                    src={galleryList[1]}
                    alt={`${product.name} campaign view`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full shadow-sm text-neutral-800 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <ZoomIn size={16} />
                  </div>
                </div>
              ) : null}

              {/* Media Item 3: Secondary / Trousers / Detail Close-up */}
              {(galleryList[2] || product.hoverImage) && (
                <div 
                  onClick={() => setZoomImage(galleryList[2] || product.hoverImage)}
                  className="relative bg-[#f4f4f4] aspect-[4/5] overflow-hidden border border-neutral-100 group cursor-pointer sm:col-span-1"
                >
                  <img
                    src={galleryList[2] || product.hoverImage}
                    alt={`${product.name} detail shot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full shadow-sm text-neutral-800 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <ZoomIn size={16} />
                  </div>
                </div>
              )}

              {/* Additional Gallery Images */}
              {galleryList.slice(3).map((extraImg, idx) => (
                <div 
                  key={idx}
                  onClick={() => setZoomImage(extraImg)}
                  className="relative bg-[#f4f4f4] aspect-[4/5] overflow-hidden border border-neutral-100 group cursor-pointer"
                >
                  <img
                    src={extraImg}
                    alt={`${product.name} gallery ${idx + 4}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full shadow-sm text-neutral-800 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <ZoomIn size={16} />
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT COLUMN: Product Details & Purchase Options (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* Title & Price */}
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold tracking-[0.08em] text-neutral-950 uppercase font-serif-luxury">
                {product.name}
              </h1>
              <p className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 font-sans">
                {product.formattedPrice || `$${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              </p>
            </div>

            {/* Description Paragraph */}
            <div className="text-sm leading-relaxed text-neutral-600 font-normal border-b border-neutral-100 pb-6">
              {product.description ||
                'Tailored from superfine wool in an opulent deep river blue, this suit embodies fluid sophistication. The sculpted shoulders and defined peak lapels create a commanding silhouette, while the feather light weave moves with quiet ease. A masterclass in modern tailoring where depth of color meets precision craftsmanship.'}
            </div>

            {/* Size Selector Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
                  SIZE (US)
                </span>
                <button
                  onClick={() => setSizeChartOpen(!sizeChartOpen)}
                  className="text-[11px] font-bold tracking-wider text-neutral-500 hover:text-black uppercase underline underline-offset-4 cursor-pointer"
                >
                  SIZE CHART
                </button>
              </div>

              {/* Size Chart Modal / Drawer Toggle */}
              {sizeChartOpen && (
                <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-2 animate-in fade-in">
                  <p className="font-bold text-black uppercase">Standard Suit Sizing (US Inches):</p>
                  <p>38: Chest 38" | Waist 32" | Shoulder 17.5"</p>
                  <p>40: Chest 40" | Waist 34" | Shoulder 18.0"</p>
                  <p>42: Chest 42" | Waist 36" | Shoulder 18.5"</p>
                  <p>44: Chest 44" | Waist 38" | Shoulder 19.0"</p>
                  <p className="text-[10px] text-neutral-500 italic mt-1">Need custom tailoring? Contact our Milan atelier after order placement.</p>
                </div>
              )}

              {/* Sizes Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                {sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-sm'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: ADD TO BAG & Apple Pay */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  icon={ShoppingBag}
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                >
                  ADD TO BAG
                </Button>

                <Button
                  variant="subtle"
                  size="lg"
                  fullWidth
                  onClick={handleApplePay}
                  className="bg-[#8c8c8c] hover:bg-neutral-700 text-white border-0"
                >
                  <span className="text-lg leading-none mr-1"></span> Pay
                </Button>
              </div>

              {/* Financing Text */}
              <p className="text-center sm:text-left text-[11px] text-neutral-500">
                Starting at $103/mo or 0% APR with <span className="font-bold text-neutral-900 underline cursor-pointer">affirm</span>. <button className="hover:underline text-neutral-700 cursor-pointer">See if you qualify</button>
              </p>
            </div>

            {/* Accordion: DETAIL & CARE */}
            <div className="border-t border-b border-neutral-200 py-4">
              <button
                onClick={() => setDetailCareOpen(!detailCareOpen)}
                className="w-full flex items-center justify-between text-xs font-bold tracking-[0.18em] text-neutral-900 uppercase py-1 cursor-pointer"
              >
                <span>DETAIL & CARE</span>
                {detailCareOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {detailCareOpen && (
                <div className="pt-3 text-xs text-neutral-600 space-y-2 leading-relaxed animate-in fade-in">
                  <p>• <strong>Material:</strong> {product.material || '100% Super 150s Italian Virgin Wool'}</p>
                  <p>• <strong>Fit:</strong> {product.fit || 'Modern Tailored Slim Fit'}</p>
                  <p>• <strong>Color:</strong> {product.color || 'Electric Royal Blue'}</p>
                  <p>• <strong>Lining:</strong> 100% Cupro Silk Lining with Bemberg finish</p>
                  <p>• <strong>Care:</strong> Specialist dry clean only. Steam iron low heat.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* CLIENT REVIEWS SECTION */}
        <div className="border-t border-neutral-200 pt-12 mt-12">
          <SectionHeader
            title="CLIENT REVIEWS"
            align="left"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Reviews List (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="border-b border-neutral-100 pb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">{rev.date}</span>
                  </div>

                  <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    {rev.author} <span className="text-[10px] text-emerald-600 font-normal lowercase tracking-normal flex-inline items-center gap-1 ml-1"><Check size={10} className="inline" /> Verified Buyer</span>
                  </p>

                  <p className="text-xs text-neutral-600 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Review Submission Notice or Form Box (5 Cols) */}
            <div className="lg:col-span-5">
              {user ? (
                <div className="border border-neutral-900 p-6 bg-neutral-50 space-y-4">
                  <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-900">
                    Leave a Client Review
                  </h3>

                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                        Rating
                      </label>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(e.target.value)}
                        className="w-full bg-white border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:outline-none"
                      >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Average</option>
                        <option value="2">2 Stars - Poor</option>
                        <option value="1">1 Star - Terrible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                        Your Review
                      </label>
                      <textarea
                        required
                        rows="4"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience with this garment's fit, fabric, and craftsmanship..."
                        className="w-full bg-white border border-neutral-300 p-3 text-xs text-neutral-900 focus:outline-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      isLoading={submittingReview}
                    >
                      {submittingReview ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="border border-neutral-900 p-8 text-center bg-white shadow-xs">
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    Only logged in customers who have purchased this product may leave a review.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      <Modal
        isOpen={Boolean(zoomImage)}
        onClose={() => setZoomImage(null)}
        maxWidth="max-w-4xl"
        className="bg-transparent shadow-none p-2"
      >
        <div className="flex items-center justify-center p-2">
          <img
            src={zoomImage}
            alt="Zoomed Product Details"
            className="max-w-full max-h-[85vh] object-contain shadow-2xl"
          />
        </div>
      </Modal>
    </div>
  );
};
