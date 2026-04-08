/* ============================================================
   KicksCulture - Admin Panel Logic
   Handles product form, product list management (UI only)
   ============================================================ */

class AdminManager {
  constructor() {
    this.products = [...PRODUCTS]; // Work with a copy
    this.editingId = null;
    this.init();
  }

  init() {
    this.renderProductList();
    this.setupForm();
  }

  setupForm() {
    const form = document.getElementById('adminProductForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateAdminForm()) {
        if (this.editingId) { this.updateProduct(); }
        else { this.addProduct(); }
      }
    });

    const cancelBtn = document.getElementById('cancelEdit');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.resetForm());
    }
  }

  validateAdminForm() {
    const name = document.getElementById('adminName').value.trim();
    const brand = document.getElementById('adminBrand').value;
    const price = document.getElementById('adminPrice').value;
    if (!name || !brand || !price) {
      showToast('Please fill in all required fields', 'error');
      return false;
    }
    return true;
  }

  addProduct() {
    const product = this.getFormData();
    product.id = Date.now();
    this.products.unshift(product);
    this.renderProductList();
    this.resetForm();
    showToast('Product added successfully!', 'success');
  }

  updateProduct() {
    const idx = this.products.findIndex(p => p.id === this.editingId);
    if (idx > -1) {
      const updated = this.getFormData();
      updated.id = this.editingId;
      this.products[idx] = { ...this.products[idx], ...updated };
      this.renderProductList();
      this.resetForm();
      showToast('Product updated successfully!', 'success');
    }
    this.editingId = null;
  }

  getFormData() {
    const brandId = document.getElementById('adminBrand').value;
    const brand = getBrandById(brandId);
    return {
      name: document.getElementById('adminName').value.trim(),
      brand: brandId,
      price: parseInt(document.getElementById('adminPrice').value),
      originalPrice: parseInt(document.getElementById('adminOriginalPrice').value) || null,
      description: document.getElementById('adminDescription').value.trim(),
      sizes: document.getElementById('adminSizes').value.split(',').map(s => parseInt(s.trim())).filter(Boolean),
      stock: parseInt(document.getElementById('adminStock').value) || 0,
      category: document.getElementById('adminCategory').value,
      trending: document.getElementById('adminTrending').checked,
      featured: document.getElementById('adminFeatured').checked,
      rating: 4.0,
      reviews: 0,
      colorCode: brand ? brand.colorCode : '#ff4d4d',
      gradient: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a2e 100%)`
    };
  }

  editProduct(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;

    this.editingId = id;
    document.getElementById('adminName').value = product.name;
    document.getElementById('adminBrand').value = product.brand;
    document.getElementById('adminPrice').value = product.price;
    document.getElementById('adminOriginalPrice').value = product.originalPrice || '';
    document.getElementById('adminDescription').value = product.description || '';
    document.getElementById('adminSizes').value = product.sizes.join(', ');
    document.getElementById('adminStock').value = product.stock;
    document.getElementById('adminCategory').value = product.category;
    document.getElementById('adminTrending').checked = product.trending;
    document.getElementById('adminFeatured').checked = product.featured;

    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('formSubmitBtn').textContent = '✓ Update Product';
    document.getElementById('cancelEdit').style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.products = this.products.filter(p => p.id !== id);
    this.renderProductList();
    showToast('Product deleted', 'info');
  }

  resetForm() {
    document.getElementById('adminProductForm').reset();
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('formSubmitBtn').textContent = '+ Add Product';
    document.getElementById('cancelEdit').style.display = 'none';
    this.editingId = null;
  }

  renderProductList() {
    const container = document.getElementById('adminProductsList');
    if (!container) return;

    if (this.products.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">No products yet. Add your first product!</p>';
      return;
    }

    container.innerHTML = this.products.map(product => {
      const brand = getBrandById(product.brand);
      const stockStatus = getStockStatus(product.stock);
      return `
        <div class="admin-product-item">
          <div class="thumb">
            ${getProductImage(product)}
          </div>
          <div class="info">
            <h4>${brand ? brand.name : product.brand} ${product.name}</h4>
            <p>${formatPrice(product.price)} · Stock: ${product.stock} · <span class="${stockStatus.class}">${stockStatus.text}</span></p>
          </div>
          <div class="actions">
            <button class="btn-edit" onclick="adminMgr.editProduct(${product.id})">Edit</button>
            <button class="btn-delete" onclick="adminMgr.deleteProduct(${product.id})">Delete</button>
          </div>
        </div>`;
    }).join('');
  }
}

let adminMgr;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('adminProductForm')) {
    adminMgr = new AdminManager();
  }
});
