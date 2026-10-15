import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './common';
import { formatPrice } from '../utils';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    showToast
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
 
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
     
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-neutral-900" />
              <h2 className="text-sm font-bold tracking-[0.18em] text-neutral-900 uppercase font-serif-luxury">
                YOUR SHOPPING BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X size={22} />
            </button>
          </div>


          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 py-12">
                <ShoppingBag size={48} strokeWidth={1} className="text-neutral-300 mb-4" />
                <p className="text-sm font-medium uppercase tracking-widest">Your shopping bag is empty</p>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Explore Collection
                  </Button>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-6 border-b border-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">Size: {item.size}</p>
                      <p className="text-xs font-semibold text-neutral-900 mt-1">{item.formattedPrice || formatPrice(item.price)}</p>
                    </div>

      
                    <div className="flex items-center space-x-3 mt-3">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

     
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-neutral-600">
                <span>Subtotal</span>
                <span className="text-sm text-neutral-900 font-bold">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 text-center tracking-widest uppercase">
                Complimentary express worldwide shipping & returns included
              </p>
              <Button
                variant="primary"
                fullWidth
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => {
                  showToast('Proceeding to MONZATO Secure Checkout...');
                }}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
