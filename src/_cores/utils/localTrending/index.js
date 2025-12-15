// utils/localTrending.js
// Local trending helper menggunakan localStorage.
// Struktur disimpan di localStorage key 'app_search_history':
// { keywords: { "<kw>": { count: number, last: timestamp } }, products: { "<id>": { count, last, name, slug, image } } }

const STORAGE_KEY = 'app_search_history';
const DEFAULT = { keywords: {}, products: {} };

function _read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT;
  } catch (e) {
    console.warn('localTrending: read error', e);
    return DEFAULT;
  }
}

function _write(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('localTrending: write error', e);
  }
}

// catat kata kunci (ketika user submit search)
export function recordSearchKeyword(keyword) {
  if (!keyword) return;
  try {
    const data = _read();
    const k = keyword.trim().toLowerCase();
    if (!k) return;
    if (!data.keywords[k]) {
      data.keywords[k] = { count: 0, last: 0 };
    }
    data.keywords[k].count += 1;
    data.keywords[k].last = Date.now();
    _write(data);
  } catch (e) {
    // ignore
  }
}

// catat product yang dipilih (ketika user klik result)
export function recordProductClick(product = {}) {
  // product should include at least id and optionally name, slug, image
  if (!product || (!product.id && !product.slug)) return;
  try {
    const data = _read();
    const id = product.id ? String(product.id) : `slug:${product.slug}`;
    if (!data.products[id]) {
      data.products[id] = {
        count: 0,
        last: 0,
        name: product.name || '',
        slug: product.slug || '',
        image: product.image || ''
      };
    }
    data.products[id].count += 1;
    data.products[id].last = Date.now();
    // update metadata
    data.products[id].name = product.name || data.products[id].name;
    data.products[id].slug = product.slug || data.products[id].slug;
    data.products[id].image = product.image || data.products[id].image;
    _write(data);
  } catch (e) {
    // ignore
  }
}

// ambil top N keyword trending (personal)
export function getTopKeywords(limit = 5) {
  try {
    const data = _read();
    const arr = Object.entries(data.keywords).map(([kw, v]) => ({ keyword: kw, count: v.count, last: v.last }));
    arr.sort((a, b) => {
      if (b.count === a.count) return b.last - a.last;
      return b.count - a.count;
    });
    return arr.slice(0, limit);
  } catch (e) {
    return [];
  }
}

// ambil top N product trending (personal)
export function getTopProducts(limit = 5) {
  try {
    const data = _read();
    const arr = Object.entries(data.products).map(([id, v]) => ({
      id,
      count: v.count,
      last: v.last,
      name: v.name,
      slug: v.slug,
      image: v.image
    }));
    arr.sort((a, b) => {
      if (b.count === a.count) return b.last - a.last;
      return b.count - a.count;
    });
    return arr.slice(0, limit);
  } catch (e) {
    return [];
  }
}

// clear helper (development)
export function clearLocalTrending() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}
