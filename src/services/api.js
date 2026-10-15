const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL);
const getHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async createProduct(productData, token) {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create product');
    return data;
  },

  async updateProduct(id, productData, token) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update product');
    return data;
  },

  async deleteProduct(id, token) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete product');
    return data;
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async register(firstName, lastName, email, password, role = 'user') {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ firstName, lastName, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async getProfile(token) {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to get profile');
    return data;
  },

  // Orders
  async createOrder(orderData, token) {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to place order');
    return data;
  },

  async getMyOrders(token) {
    const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch my orders');
    return data;
  },

  // Admin APIs
  async getAdminStats(token) {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch admin stats');
    return data;
  },

  async getAdminUsers(token) {
    const res = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
  },

  async deleteUser(id, token) {
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete user');
    return data;
  },

  async getAllOrders(token) {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch all orders');
    return data;
  },

  async updateOrderStatus(id, status, token) {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update order status');
    return data;
  },

  // Cart APIs
  async getCart(token) {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch cart');
    return data;
  },

  async addToCart(itemData, token) {
    const res = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add item to cart');
    return data;
  },

  async updateCartQuantity(itemData, token) {
    const res = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update cart item');
    return data;
  },

  async removeFromCart(itemData, token) {
    const res = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: getHeaders(token),
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to remove cart item');
    return data;
  },

  async clearCart(token) {
    const res = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to clear cart');
    return data;
  },

  async syncCart(items, token) {
    const res = await fetch(`${API_BASE_URL}/cart/sync`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to sync cart');
    return data;
  },

  // Contact API
  async submitContact(contactData) {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(contactData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit contact form');
    return data;
  },

  // Dynamic Pages API
  async getPageBySlug(slug) {
    const res = await fetch(`${API_BASE_URL}/pages/${slug}`);
    if (!res.ok) throw new Error('Failed to load page content');
    return res.json();
  },

  async getPages() {
    const res = await fetch(`${API_BASE_URL}/pages`);
    if (!res.ok) throw new Error('Failed to fetch pages');
    return res.json();
  },
};
