import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, Input } from './common';

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
    <section className="py-16 sm:py-24 bg-[#f6f6f6] text-center">
      <div className="max-w-2xl mx-auto px-4">
        
        <h2 className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-neutral-950 uppercase font-serif-luxury mb-2">
          NEWSLETTER
        </h2>

        <p className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-neutral-400 uppercase mb-8">
          STAY UP TO DATE TO GET LATEST MONZATO NEWS
        </p>

        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 py-3 px-6 bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider rounded-none max-w-md mx-auto border border-emerald-200">
            <Check size={16} />
            <span>YOU ARE SUBSCRIBED TO MONZATO NEWSLETTER</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-stretch justify-center max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                required
                className="border-r-0 py-3.5"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="px-5 py-3.5 border-l-0"
              aria-label="Subscribe"
              icon={ChevronRight}
            />
          </form>
        )}

      </div>
    </section>
  );
};
