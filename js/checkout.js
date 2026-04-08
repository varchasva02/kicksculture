/* ============================================================
   KicksCulture - Checkout & Anti-RAC Logic
   Handles checkout form, payment selection, COD popup,
   prepaid discount, and order placement
   ============================================================ */

class CheckoutManager {
  constructor() {
    this.cartMgr = new CartManager();
    this.paymentMethod = null;
    this.prepaidDiscount = 0;
    this.init();
  }

  init() {
    this.renderCheckoutSummary();
    this.setupPaymentOptions();
    this.setupFormValidation();
  }

  renderCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    if (!container) return;

    const items = this.cartMgr.getItems();
    if (items.length === 0) {
      window.location.href = 'cart.html';
      return;
    }

    let itemsHTML = '';
    items.forEach(item => {
      const product = getProductById(item.productId);
      if (!product) return;
      const brand = getBrandById(product.brand);
      itemsHTML += `
        <div style="display:flex;justify-content:space-between;padding:0.6rem 0;border-bottom:1px solid var(--border);font-size:0.9rem;">
          <div>
            <div style="font-weight:600;">${brand ? brand.name : ''} ${product.name}</div>
            <div style="color:var(--text-muted);font-size:0.8rem;">Size: UK ${item.size} × ${item.quantity}</div>
          </div>
          <div style="font-weight:700;">${formatPrice(product.price * item.quantity)}</div>
        </div>`;
    });

    const subtotal = this.cartMgr.getSubtotal();
    const shipping = subtotal > 5000 ? 0 : 299;

    container.innerHTML = `
      <h2>Order Summary</h2>
      <div>${itemsHTML}</div>
      <div class="summary-row mt-2">
        <span class="label">Subtotal</span>
        <span class="value">${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span class="label">Shipping</span>
        <span class="value">${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : formatPrice(shipping)}</span>
      </div>
      <div class="summary-row discount" id="discountRow" style="display:none;">
        <span class="label">Prepaid Discount (5%)</span>
        <span class="value" id="discountValue">-₹0</span>
      </div>
      <div class="summary-row total">
        <span class="label">Total</span>
        <span class="value" id="checkoutTotal">${formatPrice(subtotal + shipping)}</span>
      </div>`;
  }

  setupPaymentOptions() {
    const options = document.querySelectorAll('.payment-option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = true;
        this.paymentMethod = radio.value;
        this.handlePaymentSelection(radio.value);
      });
    });
  }

  handlePaymentSelection(method) {
    if (method === 'cod') {
      this.showCODPopup();
      this.removeDiscount();
    } else if (method === 'online') {
      this.applyPrepaidDiscount();
    }
  }

  showCODPopup() {
    let popup = document.getElementById('codPopup');
    if (!popup) {
      popup = document.createElement('div');
      popup.className = 'cod-popup';
      popup.id = 'codPopup';
      document.body.appendChild(popup);
    }

    const subtotal = this.cartMgr.getSubtotal();
    const discount = Math.round(subtotal * 0.05);

    popup.innerHTML = `
      <div class="cod-popup-content">
        <div class="icon">💰</div>
        <h3>Wait! Save Money with Prepaid</h3>
        <p>Get an instant <span class="discount-highlight">5% discount (${formatPrice(discount)})</span> when you pay online. Switch to prepaid and save!</p>
        <div class="cod-popup-actions">
          <button class="btn-primary" onclick="checkoutMgr.switchToOnline()">
            ✨ Switch to Online Payment
          </button>
          <button class="btn-secondary" onclick="checkoutMgr.continueCOD()">
            Continue with COD
          </button>
        </div>
      </div>`;

    setTimeout(() => popup.classList.add('active'), 10);
    popup.addEventListener('click', (e) => { if (e.target === popup) this.continueCOD(); });
  }

  switchToOnline() {
    this.closeCODPopup();
    // Switch the payment selection to online
    const onlineOption = document.querySelector('.payment-option[data-method="online"]');
    const codOption = document.querySelector('.payment-option[data-method="cod"]');
    if (onlineOption && codOption) {
      codOption.classList.remove('selected');
      codOption.querySelector('input[type="radio"]').checked = false;
      onlineOption.classList.add('selected');
      onlineOption.querySelector('input[type="radio"]').checked = true;
    }
    this.paymentMethod = 'online';
    this.applyPrepaidDiscount();
    showToast('5% prepaid discount applied!', 'success');
  }

  continueCOD() {
    this.closeCODPopup();
  }

  closeCODPopup() {
    const popup = document.getElementById('codPopup');
    if (popup) { popup.classList.remove('active'); }
  }

  applyPrepaidDiscount() {
    const subtotal = this.cartMgr.getSubtotal();
    this.prepaidDiscount = Math.round(subtotal * 0.05);
    const shipping = subtotal > 5000 ? 0 : 299;
    const total = subtotal + shipping - this.prepaidDiscount;

    const discountRow = document.getElementById('discountRow');
    const discountValue = document.getElementById('discountValue');
    const totalEl = document.getElementById('checkoutTotal');

    if (discountRow) discountRow.style.display = 'flex';
    if (discountValue) discountValue.textContent = `-${formatPrice(this.prepaidDiscount)}`;
    if (totalEl) {
      totalEl.textContent = formatPrice(total);
      totalEl.style.animation = 'none';
      totalEl.offsetHeight; // trigger reflow
      totalEl.style.animation = 'fadeIn 0.3s ease';
    }
  }

  removeDiscount() {
    this.prepaidDiscount = 0;
    const subtotal = this.cartMgr.getSubtotal();
    const shipping = subtotal > 5000 ? 0 : 299;
    const total = subtotal + shipping;

    const discountRow = document.getElementById('discountRow');
    const totalEl = document.getElementById('checkoutTotal');

    if (discountRow) discountRow.style.display = 'none';
    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateForm()) { this.placeOrder(); }
    });
  }

  validateForm() {
    let isValid = true;
    const fields = [
      { id: 'fullName', msg: 'Full name is required' },
      { id: 'email', msg: 'Valid email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      { id: 'phone', msg: 'Valid 10-digit phone required', pattern: /^\d{10}$/ },
      { id: 'address', msg: 'Address is required' },
      { id: 'city', msg: 'City is required' },
      { id: 'pincode', msg: 'Valid 6-digit pincode required', pattern: /^\d{6}$/ }
    ];

    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      if (!input) return;
      const value = input.value.trim();
      const group = input.closest('.form-group');
      if (!value || (field.pattern && !field.pattern.test(value))) {
        group.classList.add('has-error');
        const errMsg = group.querySelector('.error-msg');
        if (errMsg) errMsg.textContent = field.msg;
        isValid = false;
      }
    });

    if (!this.paymentMethod) {
      showToast('Please select a payment method', 'error');
      isValid = false;
    }

    return isValid;
  }

  placeOrder() {
    const subtotal = this.cartMgr.getSubtotal();
    const shipping = subtotal > 5000 ? 0 : 299;
    const total = subtotal + shipping - this.prepaidDiscount;

    const order = {
      id: 'KC' + Date.now().toString(36).toUpperCase(),
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: this.cartMgr.getItems().map(item => {
        const product = getProductById(item.productId);
        return {
          name: `${getProductBrandName(product)} ${product.name}`,
          size: item.size,
          quantity: item.quantity,
          price: product.price * item.quantity
        };
      }),
      subtotal,
      shipping,
      discount: this.prepaidDiscount,
      total,
      paymentMethod: this.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
      customer: {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        pincode: document.getElementById('pincode').value
      }
    };

    localStorage.setItem('kc_last_order', JSON.stringify(order));
    this.cartMgr.clear();
    window.location.href = 'confirmation.html';
  }
}

let checkoutMgr;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('checkoutForm')) {
    checkoutMgr = new CheckoutManager();
  }
});
