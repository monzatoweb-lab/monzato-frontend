import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-neutral-950 text-white px-5 py-3.5 shadow-2xl flex items-center gap-3 border-l-4 border-amber-400">
        <CheckCircle2 size={18} className="text-amber-400 flex-shrink-0" />
        <span className="text-xs font-semibold tracking-wider uppercase">
          {toastMessage}
        </span>
      </div>
    </div>
  );
};
