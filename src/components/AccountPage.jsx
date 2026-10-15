import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { Shield } from 'lucide-react';
import { Button, Input, Modal, Badge } from './common';
import {
  DashboardTab,
  UserOrdersTab,
  AdminDashboardTab,
  AdminProductsTab,
  AdminOrdersTab,
  AdminUsersTab,
  AccountDetailsTab,
  WishlistTab,
} from './account';

const DEFAULT_NEW_PRODUCT = {
  name: '',
  category: 'SUITS',
  price: '',
  image: '/images/suit_blue.jpg',
  color: 'Royal Blue',
  fit: 'Modern Slim',
  material: '100% Super 150s Wool',
  description: 'Exclusive luxury tailored suit.',
  isNewProduct: true,
  isFeatured: false,
  isBestseller: false,
  stock: 20
};

export const AccountPage = () => {
  const { user, token, activeAccountTab, setActiveAccountTab, wishlist, toggleWishlist, logoutUser, products, refreshProducts, showToast } = useCart();

  const [adminStats, setAdminStats] = useState(null);
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loadingUserOrders, setLoadingUserOrders] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProd, setNewProd] = useState(DEFAULT_NEW_PRODUCT);

  const isAdmin = user && user.role === 'admin';

  const loadUserOrders = async () => {
    if (!token) return;
    try {
      setLoadingUserOrders(true);
      const orders = await api.getMyOrders(token);
      setUserOrders(orders);
    } catch (err) {
      console.error('Failed to load user orders:', err.message);
    } finally {
      setLoadingUserOrders(false);
    }
  };

  const loadAdminData = async () => {
    if (!isAdmin || !token) return;
    try {
      const [stats, orders, usersList] = await Promise.all([
        api.getAdminStats(token).catch(() => null),
        api.getAllOrders(token).catch(() => []),
        api.getAdminUsers(token).catch(() => []),
      ]);
      setAdminStats(stats);
      setAdminOrders(orders);
      setAdminUsers(usersList);
    } catch (err) {
      console.error('Failed to load admin data:', err.message);
    }
  };

  useEffect(() => {
    if (user && token) {
      loadUserOrders();
      if (isAdmin) loadAdminData();
    }
  }, [user, token, isAdmin]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.createProduct(newProd, token);
      showToast(`Product "${newProd.name}" created successfully!`);
      setShowAddProductModal(false);
      setNewProd(DEFAULT_NEW_PRODUCT);
      refreshProducts();
      loadAdminData();
    } catch (err) {
      showToast(`Failed: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (productId, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.deleteProduct(productId, token);
      showToast(`Product "${name}" deleted`);
      refreshProducts();
      loadAdminData();
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus, token);
      showToast(`Order status updated to ${newStatus}`);
      loadAdminData();
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Delete user ${userEmail}?`)) return;
    try {
      await api.deleteUser(userId, token);
      showToast(`User ${userEmail} deleted`);
      loadAdminData();
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const accountCards = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'My Orders' },
    ...(isAdmin ? [
      { id: 'admin-dashboard', label: '⚡ Admin Stats' },
      { id: 'admin-products', label: '⚡ Manage Products' },
      { id: 'admin-orders', label: '⚡ Manage Orders' },
      { id: 'admin-users', label: '⚡ Manage Users' },
    ] : []),
    { id: 'account-details', label: 'Account Details' },
    { id: 'wishlist', label: 'Wishlist' },
  ];


  const TAB_VIEWS = {
    'dashboard': <DashboardTab user={user} isAdmin={isAdmin} />,
    'orders': <UserOrdersTab orders={userOrders} loading={loadingUserOrders} onRefresh={loadUserOrders} />,
    'admin-dashboard': isAdmin ? <AdminDashboardTab stats={adminStats} orders={adminOrders} productsCount={products.length} onRefresh={loadAdminData} /> : null,
    'admin-products': isAdmin ? <AdminProductsTab products={products} onAddProduct={() => setShowAddProductModal(true)} onDeleteProduct={handleDeleteProduct} /> : null,
    'admin-orders': isAdmin ? <AdminOrdersTab orders={adminOrders} onUpdateStatus={handleUpdateOrderStatus} onRefresh={loadAdminData} /> : null,
    'admin-users': isAdmin ? <AdminUsersTab users={adminUsers} currentUserId={user._id} onDeleteUser={handleDeleteUser} onRefresh={loadAdminData} /> : null,
    'account-details': <AccountDetailsTab user={user} />,
    'wishlist': <WishlistTab wishlist={wishlist} products={products} onRemove={toggleWishlist} />,
  };

  if (!user) {
    return (
      <div className="py-20 text-center bg-white">
        <h2 className="text-xl font-bold uppercase tracking-widest text-neutral-900 mb-4 font-serif-luxury">Account Access Required</h2>
        <p className="text-xs text-neutral-500 mb-6">Please log in to view your MONZATO account dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-white py-10 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

 
        <div className="mb-10 text-center sm:text-left flex flex-wrap justify-between items-end gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 uppercase tracking-wide font-serif-luxury">
                MY ACCOUNT
              </h1>
              {isAdmin && (
                <Badge variant="admin">
                  <Shield size={12} /> ADMIN ACCESS
                </Badge>
              )}
            </div>
            <p className="text-xs text-neutral-600 max-w-3xl leading-relaxed mt-2">
              Logged in as <span className="font-semibold text-neutral-900">{user.email}</span> ({user.firstName} {user.lastName}).
            </p>
          </div>

          <Button variant="subtle" size="sm" onClick={logoutUser}>
            LOG OUT
          </Button>
        </div>

   
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {accountCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveAccountTab(card.id)}
              className={`p-4 border text-center transition-all duration-300 text-xs cursor-pointer ${
                activeAccountTab === card.id
                  ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                  : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400'
              }`}
            >
              <span className="font-semibold tracking-wider uppercase text-[11px] block">{card.label}</span>
            </button>
          ))}
        </div>


        <div className="bg-[#fcfcfc] border border-neutral-200 p-6 sm:p-10">
          {TAB_VIEWS[activeAccountTab] || TAB_VIEWS['dashboard']}
        </div>

      </div>

 
      <Modal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        title="CREATE NEW LUXURY PRODUCT"
      >
        <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <Input
            label="Product Name*"
            required
            value={newProd.name}
            onChange={e => setNewProd({...newProd, name: e.target.value})}
            placeholder="e.g. Royal Tuxedo Suit"
          />
          <Input
            label="Price ($)*"
            type="number"
            required
            value={newProd.price}
            onChange={e => setNewProd({...newProd, price: e.target.value})}
            placeholder="1850"
          />
          <Input
            label="Category"
            value={newProd.category}
            onChange={e => setNewProd({...newProd, category: e.target.value})}
          />
          <Input
            label="Image URL"
            value={newProd.image}
            onChange={e => setNewProd({...newProd, image: e.target.value})}
            uppercase={false}
          />
          <Input
            label="Color"
            value={newProd.color}
            onChange={e => setNewProd({...newProd, color: e.target.value})}
          />
          <Input
            label="Material"
            value={newProd.material}
            onChange={e => setNewProd({...newProd, material: e.target.value})}
          />
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold tracking-[0.12em] text-neutral-800 uppercase mb-1.5">
              Description
            </label>
            <textarea
              value={newProd.description}
              onChange={e => setNewProd({...newProd, description: e.target.value})}
              className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 transition-colors"
              rows="2"
            />
          </div>
          <div className="flex gap-4 md:col-span-2 py-1">
            <label className="flex items-center gap-1.5 font-bold text-[11px] uppercase cursor-pointer">
              <input type="checkbox" checked={newProd.isNewProduct} onChange={e => setNewProd({...newProd, isNewProduct: e.target.checked})} className="w-4 h-4 cursor-pointer" /> New Collection
            </label>
            <label className="flex items-center gap-1.5 font-bold text-[11px] uppercase cursor-pointer">
              <input type="checkbox" checked={newProd.isFeatured} onChange={e => setNewProd({...newProd, isFeatured: e.target.checked})} className="w-4 h-4 cursor-pointer" /> Featured
            </label>
            <label className="flex items-center gap-1.5 font-bold text-[11px] uppercase cursor-pointer">
              <input type="checkbox" checked={newProd.isBestseller} onChange={e => setNewProd({...newProd, isBestseller: e.target.checked})} className="w-4 h-4 cursor-pointer" /> Bestseller
            </label>
          </div>
          <div className="md:col-span-2 pt-2">
            <Button type="submit" variant="primary" fullWidth>
              SAVE PRODUCT TO DATABASE
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
