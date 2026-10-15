import React, { useState } from 'react';
import { X, ChevronDown, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { Button } from './common';
import { formatPrice } from '../utils';

export const CartPage = () => {
  const {
    products,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    toggleWishlist,
    showToast,
    setActivePage,
    setActiveAccountTab,
    setQuickViewProduct,
    user,
    token,
    setIsAuthModalOpen
  } = useCart();

  const [showShippingCalc, setShowShippingCalc] = useState(false);
  const [country, setCountry] = useState('United States');
  const [zipCode, setZipCode] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleCheckout = async () => {
    if (!user || !token) {
      showToast('Please log in or register to complete your order');
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setIsPlacingOrder(true);
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          size: item.size || '44',
          product: item._id || item.id
        })),
        shippingAddress: {
          address: '123 Luxury Avenue',
          city: 'Milan',
          postalCode: zipCode || '20121',
          country: country || 'Italy'
        },
        paymentMethod: 'Credit Card',
        totalPrice: cartSubtotal
      };

      await api.createOrder(orderData, token);
      showToast('🎉 Order placed successfully and saved to MongoDB database!');
      clearCart();
      setActivePage('account');
      setActiveAccountTab('orders');
    } catch (err) {
      showToast(`Checkout failed: ${err.message}`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-white py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Page Header */}
        <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-luxury">
            Shopping Bag
          </h1>
          <span className="text-sm font-semibold text-neutral-700">
            {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 border border-neutral-200 max-w-xl mx-auto my-12 p-8">
            <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-widest mb-3 font-serif-luxury">Your Shopping Bag is empty</h2>
            <p className="text-xs text-neutral-500 mb-6">Explore our haute couture collection to add luxury tailored suits to your bag.</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setActivePage('home')}
            >
              CONTINUE SHOPPING
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
        
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const product = products.find(p => (p.id || p._id) === item.id) || item;

                return (
                  <div 
                    key={`${item.id}-${item.size}`}
                    className="bg-[#fcfcfc] border border-neutral-200 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-5 w-full sm:w-auto">
              
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0 cursor-pointer"
                        onClick={() => setQuickViewProduct(product)}
                      />

       
                      <div className="space-y-1.5">
                        <h3 
                          onClick={() => setQuickViewProduct(product)}
                          className="text-xs sm:text-sm font-bold text-neutral-950 uppercase tracking-wider cursor-pointer hover:text-neutral-600 transition-colors"
                        >
                          {item.name}
                        </h3>

                        <div className="flex items-center space-x-3 text-[11px] font-bold tracking-wider text-neutral-800 uppercase">
                          <button 
                            onClick={() => setQuickViewProduct(product)}
                            className="hover:underline cursor-pointer"
                          >
                            EDIT
                          </button>
                          <span className="text-neutral-300">|</span>
                          <button 
                            onClick={() => toggleWishlist(item.id)}
                            className="hover:underline cursor-pointer"
                          >
                            ADD TO WISHLIST
                          </button>
                        </div>

                        <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
                          SIZE (US): <span className="font-semibold text-neutral-800">{item.size}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-200">
         
                      <div className="text-center sm:text-right">
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 sm:hidden">PRICE</span>
                        <span className="text-xs font-semibold text-neutral-900">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <div className="text-center">
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 sm:hidden">QUANTITY</span>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, item.size, e.target.value)}
                          className="bg-white border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-neutral-950 cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      <div className="text-center sm:text-right">
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 sm:hidden">TOTAL</span>
                        <span className="text-xs font-bold text-neutral-950">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

               
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-neutral-400 hover:text-black transition-colors p-1 cursor-pointer"
                        aria-label="Remove product"
                      >
                        <X size={18} />
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>

       
            <div className="lg:col-span-4 bg-[#fcfcfc] border border-neutral-200 p-6 sm:p-8 space-y-6">
              <h2 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase border-b border-neutral-200 pb-4 font-serif-luxury">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 text-xs font-semibold tracking-wider text-neutral-800 uppercase">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">SUBTOTAL</span>
                  <span className="text-neutral-950 font-bold">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">SHIPPING</span>
                    <button
                      onClick={() => setShowShippingCalc(!showShippingCalc)}
                      className="text-[11px] font-bold text-neutral-800 hover:underline uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <span>CALCULATE SHIPPING</span>
                      <ChevronDown size={14} className={`transition-transform ${showShippingCalc ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {showShippingCalc && (
                    <div className="bg-white p-3 border border-neutral-200 space-y-2 mt-2">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-[11px] border border-neutral-300 p-1.5"
                      >
                        <option value="United States">United States (Complimentary Express)</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="India">India</option>
                        <option value="France">France</option>
                      </select>
                      <input
                        type="text"
                        placeholder="ZIP / POSTAL CODE"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full text-[11px] border border-neutral-300 p-1.5 uppercase"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-neutral-300 text-sm font-bold">
                  <span>TOTAL</span>
                  <span className="text-neutral-950">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isPlacingOrder}
                onClick={handleCheckout}
              >
                {isPlacingOrder ? 'PROCESSING ORDER...' : 'PROCEED TO CHECKOUT'}
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
