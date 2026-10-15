import React from 'react';
import { Shield } from 'lucide-react';

export const DashboardTab = ({ user, isAdmin }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase border-b border-neutral-200 pb-3 font-serif-luxury">
      WELCOME, {user.firstName.toUpperCase()}
    </h3>
    <p className="text-xs text-neutral-700 leading-relaxed">
      Welcome to your MONZATO Haute Couture client portal. From here you can manage your orders, edit profile details, or access administrator management features if authorized.
    </p>
    {isAdmin && (
      <div className="mt-4 p-4 bg-purple-50 border border-purple-200 text-purple-900 text-xs space-y-2">
        <p className="font-bold flex items-center gap-1.5 uppercase tracking-wider">
          <Shield size={14} /> You have Administrator Privileges
        </p>
        <p>You can manage products, view system revenue &amp; stats, update order status, and manage users using the Admin tabs above.</p>
      </div>
    )}
  </div>
);
