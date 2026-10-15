import React from 'react';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { Button, Badge } from '../common';
import { formatPrice, formatOrderId, getStatusBadgeVariant } from '../../utils';

const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const AdminOrdersTab = ({ orders, onUpdateStatus, onRefresh }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
      <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase flex items-center gap-2 font-serif-luxury">
        <ShoppingBag size={16} /> CUSTOMER ORDERS MANAGEMENT ({orders.length})
      </h3>
      <Button variant="link" size="sm" icon={RefreshCw} onClick={onRefresh}>
        Refresh
      </Button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-neutral-200 text-neutral-400 uppercase font-bold tracking-wider">
            <th className="pb-3">ORDER ID</th>
            <th className="pb-3">CUSTOMER</th>
            <th className="pb-3">TOTAL</th>
            <th className="pb-3">STATUS</th>
            <th className="pb-3 text-right">UPDATE STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
          {orders.map((ord) => (
            <tr key={ord._id}>
              <td className="py-4 font-mono font-bold">{formatOrderId(ord._id)}</td>
              <td className="py-4">
                <p className="font-bold">{ord.user?.firstName} {ord.user?.lastName}</p>
                <p className="text-[10px] text-neutral-500">{ord.user?.email}</p>
              </td>
              <td className="py-4 font-bold">{formatPrice(ord.totalPrice)}</td>
              <td className="py-4">
                <Badge variant={getStatusBadgeVariant(ord.status)}>
                  {ord.status || 'Processing'}
                </Badge>
              </td>
              <td className="py-4 text-right">
                <select
                  value={ord.status}
                  onChange={(e) => onUpdateStatus(ord._id, e.target.value)}
                  className="border border-neutral-300 px-2 py-1 text-[11px] font-bold uppercase bg-white focus:outline-none cursor-pointer"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
