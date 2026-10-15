import React from 'react';
import { Shield, ShoppingBag, Package, Users, DollarSign, RefreshCw } from 'lucide-react';
import { Button, Badge } from '../common';
import { formatPrice, formatDate, formatOrderId, getStatusBadgeVariant } from '../../utils';

export const AdminDashboardTab = ({ stats, orders, productsCount, onRefresh }) => {
  const statCards = [
    { label: 'TOTAL REVENUE', icon: DollarSign, color: 'text-emerald-600', value: formatPrice(stats?.totalRevenue) },
    { label: 'TOTAL ORDERS', icon: ShoppingBag, color: 'text-blue-600', value: stats?.totalOrders || '0' },
    { label: 'TOTAL PRODUCTS', icon: Package, color: 'text-amber-600', value: productsCount },
    { label: 'TOTAL USERS', icon: Users, color: 'text-purple-600', value: stats?.totalUsers || '0' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
        <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase flex items-center gap-2 font-serif-luxury">
          <Shield size={16} /> ADMIN DASHBOARD OVERVIEW
        </h3>
        <Button variant="link" size="sm" icon={RefreshCw} onClick={onRefresh}>
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div key={idx} className="bg-white border border-neutral-200 p-5 space-y-2">
              <div className="flex justify-between items-center text-neutral-400">
                <span className="text-[10px] font-bold tracking-widest uppercase">{card.label}</span>
                <IconComp size={18} className={card.color} />
              </div>
              <p className="text-2xl font-bold text-neutral-950">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Recent Customer Activity</h4>
        {orders.length === 0 ? (
          <p className="text-xs text-neutral-500">No orders placed yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((ord) => (
              <div key={ord._id} className="flex justify-between items-center text-xs border-b border-neutral-100 pb-2">
                <div>
                  <p className="font-bold text-neutral-900">Order {formatOrderId(ord._id)}</p>
                  <p className="text-neutral-500 text-[11px]">{ord.user?.email || 'Guest'}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-950">{formatPrice(ord.totalPrice)}</p>
                  <Badge variant={getStatusBadgeVariant(ord.status)}>
                    {ord.status || 'Processing'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
