/* ============================================================
   KicksCulture - Cart Management System
   Handles cart rendering, quantity updates, and price calculation
   ============================================================ */

class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('kc_cart') || '[]');
  }

  getItems() { return this.cart; }
  
  save() {
    localStorage.setItem('kc_cart', JSON.stringify(this.cart));
    updateCartBadge();
  }

  addItem(productId, size, quantity = 1) {
    const existing = this.cart.find(i => i.productId === productId && i.size === size);
    if (existing) { existing.quantity += quantity; }
    else { this.cart.push({ productId, size, quantity }); }
    this.save();
  }

  removeItem(productId, size) {
    this.cart = this.cart.filter(i => !(i.productId === productId && i.size === size));
    this.save();
  }

  updateQuantity(productId, size, quantity) {
    const item = this.cart.find(i => i.productId === productId && i.size === size);
    if (item) {
      if (quantity <= 0) { this.removeItem(productId, size); }
      else { item.quantity = quantity; this.save(); }
    }
  }

  getSubtotal() {
    return this.cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getOriginalTotal() {
    return this.cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? (product.originalPrice || product.price) * item.quantity : 0);
    }, 0);
  }

  getItemCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.cart = [];
    this.save();
  }
}

// ── Cart Page Renderer ────────────────────────────────────────
function renderCartPage() {
  const container = document.getElementById('cartContainer');
  if (!container) return;

  const cartMgr = new CartManager();
  const items = cartMgr.getItems();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any sneakers yet. Start shopping!</p>
        <a href="products.html" class="btn-primary">Browse Sneakers →</a>
      </div>`;
    return;
  }

  let itemsHTML = '';
  items.forEach(item => {
    const product = getProductById(item.productId);
    if (!product) return;
    const brand = getBrandById(product.brand);
    itemsHTML += `
      <div class="cart-item fade-in" data-product-id="${product.id}" data-size="${item.size}">
        <div class="cart-item-image">
          ${getProductImage(product)}
        </div>
        <div class="cart-item-details">
          <span class="brand">${brand ? brand.name : product.brand}</span>
          <h3>${product.name}</h3>
          <span class="size">Size: UK ${item.size}</span>
        </div>
        <div class="cart-item-right">
          <div class="price">${formatPrice(product.price * item.quantity)}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateCartQty(${product.id}, ${item.size}, ${item.quantity - 1})">−</button>
            <input type="text" class="qty" value="${item.quantity}" readonly>
            <button class="qty-btn" onclick="updateCartQty(${product.id}, ${item.size}, ${item.quantity + 1})">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem(${product.id}, ${item.size})">✕ Remove</button>
        </div>
      </div>`;
  });

  const subtotal = cartMgr.getSubtotal();
  const originalTotal = cartMgr.getOriginalTotal();
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 5000 ? 0 : 299;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${itemsHTML}</div>
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span class="label">Subtotal (${cartMgr.getItemCount()} items)</span>
          <span class="value">${formatPrice(subtotal)}</span>
        </div>
        ${savings > 0 ? `<div class="summary-row discount"><span class="label">Savings</span><span class="value">-${formatPrice(savings)}</span></div>` : ''}
        <div class="summary-row">
          <span class="label">Shipping</span>
          <span class="value">${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : formatPrice(shipping)}</span>
        </div>
        ${shipping > 0 ? `<div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem;">Free shipping on orders above ₹5,000</div>` : ''}
        <div class="summary-row total">
          <span class="label">Total</span>
          <span class="value">${formatPrice(total)}</span>
        </div>
        <a href="checkout.html" class="btn-checkout">Proceed to Checkout →</a>
        <a href="products.html" style="display:block;text-align:center;margin-top:1rem;color:var(--text-muted);font-size:0.85rem;">← Continue Shopping</a>
      </div>
    </div>`;
}

function updateCartQty(productId, size, newQty) {
  const cartMgr = new CartManager();
  if (newQty <= 0) {
    cartMgr.removeItem(productId, size);
    showToast('Item removed from cart', 'info');
  } else {
    cartMgr.updateQuantity(productId, size, newQty);
  }
  renderCartPage();
}

function removeCartItem(productId, size) {
  const cartMgr = new CartManager();
  cartMgr.removeItem(productId, size);
  showToast('Item removed from cart', 'info');
  renderCartPage();
}
