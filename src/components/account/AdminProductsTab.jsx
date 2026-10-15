import React from 'react';
import { Package, Plus, Trash2 } from 'lucide-react';
import { Button } from '../common';
import { formatPrice } from '../../utils';

export const AdminProductsTab = ({ products, onAddProduct, onDeleteProduct }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
      <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase flex items-center gap-2 font-serif-luxury">
        <Package size={16} /> PRODUCT CATALOG MANAGEMENT ({products.length})
      </h3>
      <Button variant="primary" size="sm" icon={Plus} onClick={onAddProduct}>
        ADD NEW PRODUCT
      </Button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-neutral-200 text-neutral-400 uppercase font-bold tracking-wider">
            <th className="pb-3">PRODUCT</th>
            <th className="pb-3">CATEGORY</th>
            <th className="pb-3">PRICE</th>
            <th className="pb-3">STOCK</th>
            <th className="pb-3 text-right">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
          {products.map((p) => (
            <tr key={p.id || p._id}>
              <td className="py-3 flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-10 h-12 object-cover" />
                <div>
                  <p className="font-bold text-neutral-900 uppercase">{p.name}</p>
                  <p className="text-[10px] text-neutral-500">{p.color}</p>
                </div>
              </td>
              <td className="py-3">{p.category}</td>
              <td className="py-3 font-bold">{formatPrice(p.price)}</td>
              <td className="py-3">{p.stock || 50}</td>
              <td className="py-3 text-right">
                <button
                  onClick={() => onDeleteProduct(p._id || p.id, p.name)}
                  className="p-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                  title="Delete product"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
