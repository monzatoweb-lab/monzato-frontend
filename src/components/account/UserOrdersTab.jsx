import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button, Badge } from '../common';
import { formatPrice, formatDate, formatOrderId, getStatusBadgeVariant } from '../../utils';

export const UserOrdersTab = ({ orders, loading, onRefresh }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
      <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase font-serif-luxury">
        MY ORDERS ({orders.length})
      </h3>
      <Button variant="link" size="sm" icon={RefreshCw} onClick={onRefresh}>
        Refresh
      </Button>
    </div>

    {loading ? (
      <p className="text-xs text-neutral-500">Loading your orders...</p>
    ) : orders.length === 0 ? (
      <p className="text-xs text-neutral-500">You haven't placed any orders yet.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-400 uppercase font-bold tracking-wider">
              <th className="pb-3">ORDER ID</th>
              <th className="pb-3">DATE</th>
              <th className="pb-3">STATUS</th>
              <th className="pb-3">TOTAL</th>
              <th className="pb-3 text-right">ITEMS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
            {orders.map((ord) => (
              <tr key={ord._id}>
                <td className="py-4 font-mono font-bold text-[11px]">{formatOrderId(ord._id)}</td>
                <td className="py-4">{formatDate(ord.createdAt)}</td>
                <td className="py-4">
                  <Badge variant={getStatusBadgeVariant(ord.status)}>
                    {ord.status || 'Processing'}
                  </Badge>
                </td>
                <td className="py-4 font-bold">{formatPrice(ord.totalPrice)}</td>
                <td className="py-4 text-right">{ord.orderItems?.length} item(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
