import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('monzato_guest_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'chartreuse-royale-suit',
          name: 'CHARTREUSE ROYALE SUIT',
          price: 1950.00,
          formattedPrice: '$1,950.00',
          image: '/images/suit_chartreuse.jpg',
          quantity: 1,
          size: '44'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState(['chartreuse-royale-suit']);
  const [toastMessage, setToastMessage] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Page Routing & Navigation state
  const activePage = location.pathname === '/'
    ? 'home'
    : location.pathname.replace('/', '');

  const [activeAccountTab, setActiveAccountTab] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const setActivePage = (page) => {
    const targetPath = page === 'home' ? '/' : `/${page}`;
    navigate(targetPath);
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    navigate('/product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Auth & Token state initialized from localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('monzato_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('monzato_token') || null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [backendSubtotal, setBackendSubtotal] = useState(null);
  const [backendTotalCount, setBackendTotalCount] = useState(null);

  // Save guest cart to localStorage when user is not logged in
  useEffect(() => {
    if (!token) {
      try {
        localStorage.setItem('monzato_guest_cart', JSON.stringify(cartItems));
      } catch (err) {
        console.warn('Failed to save guest cart to localStorage:', err);
      }
    } else {
      localStorage.removeItem('monzato_guest_cart');
    }
  }, [cartItems, token]);

  // Load products from backend API
  const fetchProductsFromApi = async () => {
    try {
      setLoadingProducts(true);
      const data = await api.getProducts();
      if (Array.isArray(data) && data.length > 0) {
        // Map _id / slug to id for frontend compatibility
        const mapped = data.map(p => ({
          ...p,
          id: p._id || p.slug,
          isNew: p.isNewProduct,
        }));
        setProducts(mapped);
      }
    } catch (err) {
      console.warn('Backend API connection failed, using fallback mock data:', err.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Helper to map backend cart response to context state
  const applyBackendCartData = (cartData) => {
    if (cartData && Array.isArray(cartData.items)) {
      const mapped = cartData.items.map(item => ({
        ...item,
        id: item.product,
        _id: item.product,
      }));
      setCartItems(mapped);
      setBackendSubtotal(cartData.subtotal);
      setBackendTotalCount(cartData.totalItemsCount);
    }
  };

  // Fetch and sync cart with backend when token is available
  const syncCartWithBackend = async (authToken, guestItemsToSync = []) => {
    const activeToken = authToken || token;
    if (!activeToken) return;
    try {
      let cartData;
      if (Array.isArray(guestItemsToSync) && guestItemsToSync.length > 0) {
        const itemsToSync = guestItemsToSync.map(item => ({
          product: item.id || item._id || item.product,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size || '44',
          quantity: item.quantity || 1,
        }));
        cartData = await api.syncCart(itemsToSync, activeToken);
      } else {
        cartData = await api.getCart(activeToken);
      }
      applyBackendCartData(cartData);
    } catch (err) {
      console.warn('Failed to sync backend cart:', err.message);
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
    if (token) {
      syncCartWithBackend(token);
    }
  }, [token]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = async (product, size = '44') => {
    const pId = product.id || product._id;
    if (token) {
      try {
        const updatedCart = await api.addToCart({
          product: pId,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: 1
        }, token);
        applyBackendCartData(updatedCart);
        showToast(`Added ${product.name} to Shopping Bag (Backend Synced)`);
        return;
      } catch (err) {
        console.error('Failed to add item to backend cart:', err);
      }
    }

    // Local fallback for guest
    setCartItems(prev => {
      const existing = prev.find(item => item.id === pId && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === pId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, id: pId, size, quantity: 1 }];
    });
    showToast(`Added ${product.name} to Shopping Bag`);
  };

  const removeFromCart = async (id, size) => {
    if (token) {
      try {
        const updatedCart = await api.removeFromCart({ product: id, size }, token);
        applyBackendCartData(updatedCart);
        showToast('Item removed from Shopping Bag (Backend Synced)');
        return;
      } catch (err) {
        console.error('Failed to remove item from backend cart:', err);
      }
    }

    // Local fallback
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
    showToast('Item removed from Shopping Bag');
  };

  const updateQuantity = async (id, size, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(id, size);
      return;
    }

    if (token) {
      try {
        const updatedCart = await api.updateCartQuantity({ product: id, size, quantity: Number(quantity) }, token);
        applyBackendCartData(updatedCart);
        return;
      } catch (err) {
        console.error('Failed to update cart quantity on backend:', err);
      }
    }

    // Local fallback
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    }));
  };

  const clearCart = async () => {
    if (token) {
      try {
        const updatedCart = await api.clearCart(token);
        applyBackendCartData(updatedCart);
        return;
      } catch (err) {
        console.error('Failed to clear backend cart:', err);
      }
    }
    setCartItems([]);
    setBackendSubtotal(0);
    setBackendTotalCount(0);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        showToast('Removed from Wishlist');
        return prev.filter(item => item !== id);
      } else {
        showToast('Added to Wishlist');
        return [...prev, id];
      }
    });
  };

  const loginUser = async (email, password) => {
    try {
      const guestItems = [...cartItems];
      const data = await api.login(email, password);
      setUser(data);
      setToken(data.token);
      localStorage.setItem('monzato_user', JSON.stringify(data));
      localStorage.setItem('monzato_token', data.token);
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${data.firstName}!`);
      await syncCartWithBackend(data.token, guestItems);
      return data;
    } catch (err) {
      showToast(`Login failed: ${err.message}`);
      throw err;
    }
  };

  const registerUser = async (firstName, lastName, email, password) => {
    try {
      const guestItems = [...cartItems];
      const data = await api.register(firstName, lastName, email, password);
      setUser(data);
      setToken(data.token);
      localStorage.setItem('monzato_user', JSON.stringify(data));
      localStorage.setItem('monzato_token', data.token);
      setIsAuthModalOpen(false);
      showToast('Account created successfully!');
      await syncCartWithBackend(data.token, guestItems);
      return data;
    } catch (err) {
      showToast(`Registration failed: ${err.message}`);
      throw err;
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setBackendSubtotal(null);
    setBackendTotalCount(null);
    setCartItems([]);
    localStorage.removeItem('monzato_user');
    localStorage.removeItem('monzato_token');
    localStorage.removeItem('monzato_guest_cart');
    setActivePage('home');
    showToast('Logged out of MONZATO');
  };

  const totalItemsCount = token && backendTotalCount !== null
    ? backendTotalCount
    : cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = token && backendSubtotal !== null
    ? backendSubtotal
    : cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      products,
      loadingProducts,
      refreshProducts: fetchProductsFromApi,
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItemsCount,
      cartSubtotal,
      quickViewProduct,
      setQuickViewProduct,
      wishlist,
      toggleWishlist,
      toastMessage,
      showToast,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      activePage,
      setActivePage,
      activeAccountTab,
      setActiveAccountTab,
      selectedProduct,
      setSelectedProduct,
      openProductDetails,
      user,
      setUser,
      token,
      isAuthModalOpen,
      setIsAuthModalOpen,
      loginUser,
      registerUser,
      logoutUser
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
