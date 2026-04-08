/* ============================================================
   KicksCulture - Product Data Store
   Contains all product data, brand info, and data helpers
   ============================================================ */

// ── Brand Configuration ───────────────────────────────────────
const BRANDS = [
  { id: 'nike', name: 'Nike', colorCode: '#FF4B4B', logo: '✦' },
  { id: 'adidas', name: 'Adidas', colorCode: '#4D8BFF', logo: '◆' },
  { id: 'puma', name: 'Puma', colorCode: '#4DCC6F', logo: '◈' },
  { id: 'jordan', name: 'Jordan', colorCode: '#FFD700', logo: '★' },
  { id: 'newbalance', name: 'New Balance', colorCode: '#FF8C42', logo: '◉' }
];

// ── Category Configuration ────────────────────────────────────
const CATEGORIES = [
  { id: 'running', name: 'Running', icon: '🏃' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🔥' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'skateboarding', name: 'Skateboarding', icon: '🛹' },
  { id: 'training', name: 'Training', icon: '💪' }
];

// ── Product Data ──────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Air Max 90',
    brand: 'nike',
    price: 12999,
    originalPrice: 14999,
    description: 'The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU details. Fresh colors add a modern look while Max Air cushioning adds comfort to your ride.',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    stock: 15,
    category: 'lifestyle',
    trending: true,
    featured: true,
    rating: 4.5,
    reviews: 234,
    colorCode: '#FF4B4B',
    image: 'assets/products/1.png'
  },
  {
    id: 2,
    name: 'Air Force 1 \'07',
    brand: 'nike',
    price: 8999,
    originalPrice: 9999,
    description: 'The radiance lives on in the Nike Air Force 1 \'07. This b-ball icon puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash.',
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 22,
    category: 'lifestyle',
    trending: true,
    featured: false,
    rating: 4.7,
    reviews: 512,
    colorCode: '#FF6B6B',
    image: 'assets/products/2.png'
  },
  {
    id: 3,
    name: 'Dunk Low Retro',
    brand: 'nike',
    price: 9499,
    originalPrice: 10999,
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors. This basketball icon channels \'80s vintage vibes back onto the pointed court.',
    sizes: [7, 8, 9, 10, 11],
    stock: 8,
    category: 'skateboarding',
    trending: true,
    featured: true,
    rating: 4.8,
    reviews: 789,
    colorCode: '#FF3333',
    image: 'assets/products/3.png'
  },
  {
    id: 4,
    name: 'React Vision',
    brand: 'nike',
    price: 11999,
    originalPrice: 13999,
    description: 'The Nike React Vision brings together a layered look with a combination of textures and transparent TPE overlays to showcase the React foam midsole for a comfortable underfoot feel.',
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 12,
    category: 'running',
    trending: false,
    featured: false,
    rating: 4.3,
    reviews: 156,
    colorCode: '#FF5252',
    image: 'assets/products/4.png'
  },
  {
    id: 5,
    name: 'Ultraboost 22',
    brand: 'adidas',
    price: 16999,
    originalPrice: 19999,
    description: 'Feel the difference with Ultraboost 22. The Linear Energy Push system works with the BOOST midsole to deliver incredible energy return stride after stride, mile after mile.',
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 10,
    category: 'running',
    trending: true,
    featured: true,
    rating: 4.6,
    reviews: 345,
    colorCode: '#4D8BFF',
    image: 'assets/products/5.png'
  },
  {
    id: 6,
    name: 'Stan Smith',
    brand: 'adidas',
    price: 7999,
    originalPrice: 8999,
    description: 'Since 1971, the adidas Stan Smith shoes have been a style staple. The pristine look of these sneakers makes them easy to wear with everything from jeans to joggers.',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    stock: 30,
    category: 'lifestyle',
    trending: false,
    featured: false,
    rating: 4.4,
    reviews: 678,
    colorCode: '#6BA3FF',
    image: 'assets/products/6.png'
  },
  {
    id: 7,
    name: 'NMD R1',
    brand: 'adidas',
    price: 13499,
    originalPrice: 15999,
    description: 'The adidas NMD R1 combines a modern streetwear aesthetic with the comfort of Boost cushioning. The sock-like construction and innovative design make it a perfect blend of comfort and style.',
    sizes: [7, 8, 9, 10, 11],
    stock: 14,
    category: 'lifestyle',
    trending: true,
    featured: false,
    rating: 4.5,
    reviews: 423,
    colorCode: '#3D7AFF',
    image: 'assets/products/7.png'
  },
  {
    id: 8,
    name: 'Superstar',
    brand: 'adidas',
    price: 8499,
    originalPrice: 9499,
    description: 'Born in 1969, the adidas Superstar shoe was the first low-top basketball sneaker featuring an all-leather upper and the iconic rubber shell toe. These sneakers stay true to the original design.',
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 25,
    category: 'lifestyle',
    trending: false,
    featured: true,
    rating: 4.6,
    reviews: 892,
    colorCode: '#5C9AFF',
    image: 'assets/products/8.png'
  },
  {
    id: 9,
    name: 'RS-X Reinvention',
    brand: 'puma',
    price: 9999,
    originalPrice: 11999,
    description: 'The RS-X Reinvention takes the original RS design and amplifies it with bolder colors, bulkier proportions, and more extreme material mixes for a truly standout look.',
    sizes: [7, 8, 9, 10, 11],
    stock: 18,
    category: 'lifestyle',
    trending: true,
    featured: false,
    rating: 4.3,
    reviews: 198,
    colorCode: '#4DCC6F',
    image: 'assets/products/9.png'
  },
  {
    id: 10,
    name: 'Suede Classic',
    brand: 'puma',
    price: 6499,
    originalPrice: 7499,
    description: 'The Puma Suede has been a street-fashion icon since 1968. It\'s been worn by icons of every generation, from the hip-hop kings to the skateboard pioneers, and has become one of the most iconic sneakers.',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    stock: 35,
    category: 'lifestyle',
    trending: false,
    featured: false,
    rating: 4.2,
    reviews: 567,
    colorCode: '#66D98A',
    image: 'assets/products/10.png'
  },
  {
    id: 11,
    name: 'Future Rider',
    brand: 'puma',
    price: 7499,
    originalPrice: 8999,
    description: 'PUMA takes its classic Rider silhouette and reimagines it as the Future Rider. With Rider Foam technology for lightweight cushioning, this sneaker brings retro style into the future.',
    sizes: [7, 8, 9, 10, 11],
    stock: 20,
    category: 'running',
    trending: false,
    featured: false,
    rating: 4.1,
    reviews: 134,
    colorCode: '#33CC5E',
    image: 'assets/products/11.png'
  },
  {
    id: 12,
    name: 'Retro High OG',
    brand: 'jordan',
    price: 16999,
    originalPrice: 18999,
    description: 'The Air Jordan 1 Retro High OG is a true basketball icon that transcended the sport to become a symbol of cultural coolness. Features premium leather, original colorway, and Nike Air cushioning.',
    sizes: [7, 8, 9, 10, 11],
    stock: 5,
    category: 'basketball',
    trending: true,
    featured: true,
    rating: 4.9,
    reviews: 1023,
    colorCode: '#FFD700',
    image: 'assets/products/12.png'
  },
  {
    id: 13,
    name: 'Retro 4 "Bred"',
    brand: 'jordan',
    price: 19999,
    originalPrice: 22999,
    description: 'The Air Jordan 4 is a sneaker legend. With its mesh panels, visible Air unit, and winglet lace system, the Jordan 4 Bred colorway is one of the most sought-after sneakers of all time.',
    sizes: [8, 9, 10, 11],
    stock: 3,
    category: 'basketball',
    trending: true,
    featured: true,
    rating: 4.9,
    reviews: 876,
    colorCode: '#FFC700',
    image: 'assets/products/13.png'
  },
  {
    id: 14,
    name: 'Retro 11 "Concord"',
    brand: 'jordan',
    price: 21999,
    originalPrice: 24999,
    description: 'The Air Jordan 11 Concord is widely considered the greatest sneaker ever made. With its signature patent leather mudguard, translucent outsole, and carbon fiber spring plate.',
    sizes: [8, 9, 10, 11, 12],
    stock: 4,
    category: 'basketball',
    trending: true,
    featured: false,
    rating: 4.8,
    reviews: 654,
    colorCode: '#FFB700',
    image: 'assets/products/14.png'
  },
  {
    id: 15,
    name: '574 Core',
    brand: 'newbalance',
    price: 8999,
    originalPrice: 10999,
    description: 'The New Balance 574 is one of the most iconic sneakers in the brand\'s repertoire. With ENCAP midsole technology for support and cushioning, it\'s a timeless classic for everyday wear.',
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 16,
    category: 'lifestyle',
    trending: false,
    featured: false,
    rating: 4.4,
    reviews: 345,
    colorCode: '#FF8C42',
    image: 'assets/products/15.png'
  },
  {
    id: 16,
    name: '990v5 Made in USA',
    brand: 'newbalance',
    price: 24999,
    originalPrice: 27999,
    description: 'The New Balance 990v5 continues the legacy of the pinnacle running shoe. Crafted with premium materials in the USA, it features ENCAP midsole cushioning and a pigskin/mesh upper.',
    sizes: [7, 8, 9, 10, 11],
    stock: 6,
    category: 'running',
    trending: true,
    featured: true,
    rating: 4.7,
    reviews: 432,
    colorCode: '#FFA366',
    image: 'assets/products/16.png'
  }
];

// ── Data Helper Functions ─────────────────────────────────────

/** Get product by ID */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

/** Get brand info by ID */
function getBrandById(brandId) {
  return BRANDS.find(b => b.id === brandId);
}

/** Get brand display name for a product */
function getProductBrandName(product) {
  const brand = getBrandById(product.brand);
  return brand ? brand.name : product.brand;
}

/** Filter products by criteria */
function filterProducts({ brand, category, minPrice, maxPrice, search, size }) {
  return PRODUCTS.filter(product => {
    if (brand && product.brand !== brand) return false;
    if (category && product.category !== category) return false;
    if (minPrice && product.price < minPrice) return false;
    if (maxPrice && product.price > maxPrice) return false;
    if (size && !product.sizes.includes(parseInt(size))) return false;
    if (search) {
      const q = search.toLowerCase();
      const brandName = getProductBrandName(product).toLowerCase();
      if (!product.name.toLowerCase().includes(q) && !brandName.includes(q) && !product.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}

/** Sort products */
function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low': return sorted.sort((a, b) => a.price - b.price);
    case 'price-high': return sorted.sort((a, b) => b.price - a.price);
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
    case 'popular': return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'newest': return sorted.sort((a, b) => b.id - a.id);
    default: return sorted;
  }
}

/** Get trending products */
function getTrendingProducts() {
  return PRODUCTS.filter(p => p.trending);
}

/** Get featured products */
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

/** Get products by brand */
function getProductsByBrand(brandId) {
  return PRODUCTS.filter(p => p.brand === brandId);
}

/** Format price to INR */
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

/** Calculate discount percentage */
function getDiscount(product) {
  if (!product.originalPrice) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

/** Get stock status text */
function getStockStatus(stock) {
  if (stock <= 0) return { text: 'Out of Stock', class: 'out-of-stock' };
  if (stock <= 5) return { text: `Only ${stock} left!`, class: 'low-stock' };
  return { text: 'In Stock', class: 'in-stock' };
}

/** Get product image HTML */
function getProductImage(product) {
  return `<img src="${product.image}" alt="${getProductBrandName(product)} ${product.name}" class="product-img">`;
}
