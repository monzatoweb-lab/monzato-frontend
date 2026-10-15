/**
 * Formats a numeric price into USD currency format (e.g. $1,640.00).
 *
 * @param {number|string} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  const numericVal = Number(amount) || 0;
  return `$${numericVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Formats an ISO date string or timestamp into a clean locale date string.
 *
 * @param {string|Date} dateVal
 * @returns {string}
 */
export const formatDate = (dateVal) => {
  if (!dateVal) return 'N/A';
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

/**
 * Returns a shortened display format for MongoDB ObjectIds or Order IDs (e.g. #ORD-89210).
 *
 * @param {string} id
 * @returns {string}
 */
export const formatOrderId = (id) => {
  if (!id) return '#';
  return `#${String(id).slice(-6).toUpperCase()}`;
};

/**
 * Maps an order status string to its corresponding Badge variant.
 *
 * @param {string} status
 * @returns {'success' | 'info' | 'danger' | 'warning'}
 */
export const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Shipped':
      return 'info';
    case 'Cancelled':
      return 'danger';
    default:
      return 'warning';
  }
};

/**
 * Smoothly scrolls to a DOM element by ID if it exists.
 *
 * @param {string} elementId
 */
export const scrollToElement = (elementId) => {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
