/* ============================================================
   KicksCulture - Main Application Logic
   Handles navbar, footer, search, wishlist, notifications, 
   quick view modal, product card rendering, and common UI
   ============================================================ */

// ── Wishlist Manager ──────────────────────────────────────────
class WishlistManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('kc_wishlist') || '[]');
  }
  toggle(productId) {
    const idx = this.items.indexOf(productId);
    if (idx > -1) { this.items.splice(idx, 1); showToast('Removed from wishlist', 'info'); }
    else { this.items.push(productId); showToast('Added to wishlist!', 'success'); }
    localStorage.setItem('kc_wishlist', JSON.stringify(this.items));
    this.updateUI();
    return this.has(productId);
  }
  has(productId) { return this.items.includes(productId); }
  updateUI() {
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const id = parseInt(btn.dataset.productId);
      btn.classList.toggle('wishlisted', this.has(id));
      btn.innerHTML = this.has(id) ? '♥' : '♡';
    });
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
      badge.textContent = this.items.length;
      badge.style.display = this.items.length > 0 ? 'flex' : 'none';
    }
  }
}

const wishlist = new WishlistManager();

// ── Toast Notification System ─────────────────────────────────
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span><span class="toast-msg">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ── Navbar Rendering ──────────────────────────────────────────
function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  const cartCount = getCartCount();
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">KicksCulture</a>
    <div class="nav-links" id="navLinks">
      <a href="index.html" class="${isPage('index') ? 'active' : ''}">Home</a>
      <a href="products.html" class="${isPage('products') ? 'active' : ''}">Products</a>
      <a href="cart.html" class="${isPage('cart') ? 'active' : ''}">Cart</a>
    </div>
    <div class="nav-actions">
      <div class="nav-search">
        <span class="search-icon">🔍</span>
        <input type="text" id="navSearchInput" placeholder="Search sneakers..." autocomplete="off">
      </div>
      <button class="nav-btn" onclick="window.location.href='products.html?wishlist=true'" title="Wishlist">
        ♡ <span class="badge wishlist-badge" style="display:${wishlist.items.length?'flex':'none'}">${wishlist.items.length}</span>
      </button>
      <button class="nav-btn" onclick="window.location.href='cart.html'" title="Cart" id="navCartBtn">
        🛒 <span class="badge cart-badge" style="display:${cartCount?'flex':'none'}">${cartCount}</span>
      </button>
      <a href="login.html" class="nav-auth-btn">Login</a>
      <div class="nav-toggle" id="navToggle" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  document.body.prepend(nav);

  // Scroll effect
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Search
  const searchInput = document.getElementById('navSearchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
}

function isPage(name) {
  const path = window.location.pathname.toLowerCase();
  if (name === 'index') return path.endsWith('index.html') || path.endsWith('/') || path.endsWith('kicksculture/');
  return path.includes(name);
}

function toggleMobileNav() {
  document.getElementById('navLinks').classList.toggle('active');
}

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem('kc_cart') || '[]');
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartBadge() {
  const count = getCartCount();
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ── Footer Rendering ──────────────────────────────────────────
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-brand">
        <div class="footer-logo">KicksCulture</div>
        <p>Your ultimate destination for premium sneakers. We bring you the latest drops from top brands worldwide.</p>
        <div class="footer-social">
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="Twitter">🐦</a>
          <a href="#" title="Facebook">📘</a>
          <a href="#" title="YouTube">▶️</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <a href="products.html?brand=nike">Nike</a>
        <a href="products.html?brand=adidas">Adidas</a>
        <a href="products.html?brand=puma">Puma</a>
        <a href="products.html?brand=jordan">Jordan</a>
        <a href="products.html?brand=newbalance">New Balance</a>
      </div>
      <div class="footer-col">
        <h4>Help</h4>
        <a href="#">FAQs</a>
        <a href="#">Shipping Info</a>
        <a href="#">Returns</a>
        <a href="#">Size Guide</a>
        <a href="#">Contact Us</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="#">About Us</a>
        <a href="#">Careers</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="admin.html">Admin Panel 🔒</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 KicksCulture. All rights reserved.</span>
      <span>Made with ❤️ for sneaker lovers</span>
    </div>`;
  document.body.appendChild(footer);
}

// ── Back to Top Button ────────────────────────────────────────
function renderBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.id = 'backToTop';
  btn.innerHTML = '↑';
  btn.title = 'Back to top';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
}

// ── Loading Screen ────────────────────────────────────────────
function showLoadingScreen() {
  const loader = document.createElement('div');
  loader.className = 'loading-screen';
  loader.id = 'loadingScreen';
  loader.innerHTML = '<div class="loader"></div>';
  document.body.prepend(loader);
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 500);
    }, 400);
  });
}

// ── Product Card Rendering ────────────────────────────────────
function renderProductCard(product) {
  const brand = getBrandById(product.brand);
  const discount = getDiscount(product);
  const stars = renderStars(product.rating);
  const isWishlisted = wishlist.has(product.id);

  return `
    <div class="product-card fade-in" data-product-id="${product.id}" onclick="goToProduct(${product.id})">
      <div class="product-card-image">
        ${discount > 0 ? `<span class="product-card-badge">-${discount}%</span>` : ''}
        <div class="product-card-actions" onclick="event.stopPropagation()">
          <button class="product-card-action-btn ${isWishlisted ? 'wishlisted' : ''}" data-wishlist-btn data-product-id="${product.id}" onclick="toggleWishlist(${product.id})" title="Wishlist">${isWishlisted ? '♥' : '♡'}</button>
          <button class="product-card-action-btn" onclick="openQuickView(${product.id})" title="Quick View">👁</button>
        </div>
        ${getProductImage(product)}
      </div>
      <div class="product-card-info">
        <div class="product-card-brand">${brand ? brand.name : product.brand}</div>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-rating">
          <span class="stars">${stars}</span>
          <span class="count">(${product.reviews})</span>
        </div>
        <div class="product-card-price">
          <span class="current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="discount">${discount}% off</span>` : ''}
        </div>
      </div>
    </div>`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function goToProduct(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

function toggleWishlist(id) {
  wishlist.toggle(id);
}

// ── Quick View Modal ──────────────────────────────────────────
function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  let overlay = document.getElementById('quickViewModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'quickViewModal';
    document.body.appendChild(overlay);
  }

  const brand = getBrandById(product.brand);
  const discount = getDiscount(product);
  const stockStatus = getStockStatus(product.stock);
  const stars = renderStars(product.rating);

  overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeQuickView()">✕</button>
      <div class="modal-body">
        <div class="modal-image">
          ${getProductImage(product)}
        </div>
        <div class="modal-details">
          <div class="modal-brand">${brand ? brand.name : product.brand}</div>
          <div class="modal-name">${product.name}</div>
          <div class="product-card-rating">
            <span class="stars">${stars}</span>
            <span class="count">${product.rating} (${product.reviews} reviews)</span>
          </div>
          <div class="modal-price-row">
            <span class="modal-price">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="modal-original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            ${discount > 0 ? `<span class="product-card-price"><span class="discount">${discount}% off</span></span>` : ''}
          </div>
          <p class="modal-desc">${product.description}</p>
          <div class="stock-status ${stockStatus.class}">
            <span class="stock-dot"></span> ${stockStatus.text}
          </div>
          <label style="font-weight:600;font-size:0.9rem;margin-bottom:0.3rem;">Select Size</label>
          <div class="size-selector" id="modalSizeSelector">
            ${product.sizes.map(s => `<button class="size-btn" data-size="${s}" onclick="selectModalSize(this)">${s}</button>`).join('')}
          </div>
          <div style="display:flex;gap:1rem;margin-top:1rem;">
            <button class="btn-add-cart" onclick="addToCartFromModal(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
              🛒 Add to Cart
            </button>
            <button class="btn-wishlist ${wishlist.has(product.id)?'wishlisted':''}" data-wishlist-btn data-product-id="${product.id}" onclick="toggleWishlist(${product.id})">
              ${wishlist.has(product.id) ? '♥' : '♡'}
            </button>
          </div>
          <a href="product-detail.html?id=${product.id}" style="color:var(--accent-primary);font-size:0.9rem;font-weight:600;margin-top:0.5rem;display:inline-block;">View Full Details →</a>
        </div>
      </div>
    </div>`;
  
  setTimeout(() => overlay.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuickView(); });
}

let selectedModalSize = null;
function selectModalSize(btn) {
  document.querySelectorAll('#modalSizeSelector .size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedModalSize = parseInt(btn.dataset.size);
}

function addToCartFromModal(productId) {
  if (!selectedModalSize) { showToast('Please select a size', 'error'); return; }
  addToCart(productId, selectedModalSize, 1);
  closeQuickView();
}

function closeQuickView() {
  const overlay = document.getElementById('quickViewModal');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    selectedModalSize = null;
  }
}

// ── Cart Helper (used across pages) ───────────────────────────
function addToCart(productId, size, quantity = 1) {
  const cart = JSON.parse(localStorage.getItem('kc_cart') || '[]');
  const existing = cart.find(item => item.productId === productId && item.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, size, quantity });
  }
  localStorage.setItem('kc_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast('Added to cart!', 'success');
}

// ── Initialize Common UI ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showLoadingScreen();
  renderNavbar();
  renderFooter();
  renderBackToTop();
  wishlist.updateUI();
});
