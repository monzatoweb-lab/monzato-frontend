import React from 'react';
import { Button } from '../common';
import { formatPrice } from '../../utils';

export const WishlistTab = ({ wishlist, products, onRemove }) => {
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id || p.slug));

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase border-b border-neutral-200 pb-3 font-serif-luxury">
        MY WISHLIST ({wishlist.length})
      </h3>
      {wishlist.length === 0 ? (
        <p className="text-xs text-neutral-500">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlistedProducts.map((p) => (
            <div key={p.id || p._id} className="border border-neutral-200 bg-white p-3 space-y-2">
              <img src={p.image} alt={p.name} className="w-full aspect-[4/5] object-cover" />
              <h4 className="text-xs font-bold text-neutral-900 uppercase">{p.name}</h4>
              <p className="text-xs text-neutral-600 font-semibold">{p.formattedPrice || formatPrice(p.price)}</p>
              <Button variant="subtle" size="sm" fullWidth onClick={() => onRemove(p.id || p.slug)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
