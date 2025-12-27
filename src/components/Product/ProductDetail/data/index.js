// -- assets
import ImageProduct1 from '@assets/image/dummy/product-1.png';
import ImageProduct2 from '@assets/image/dummy/product-2.png';
import ImageProduct3 from '@assets/image/dummy/product-3.png';
import ImageProduct4 from '@assets/image/dummy/product-4.png';
import Product1 from '@assets/image/dummy/product-1.png';
import Product2 from '@assets/image/dummy/product-2.png';
import Product3 from '@assets/image/dummy/product-3.png';
import Product4 from '@assets/image/dummy/product-4.png';
import Brand from '@assets/image/dummy/logo-zagg.jpg';

const data = {
  id: 1,
  name: 'Zagg Case for iPhone 16 - Snap - Crystal Palace',
  slug: 'zagg-case-for-iphone-16-snap-crystal-palace',
  review: {
    total: 1289,
    average: 4.8
  },
  price: 450000,
  sold: 500,
  cover: [
    { key: 1, image: ImageProduct1, alt: 'Product Image 1' },
    { key: 2, image: ImageProduct2, alt: 'Product Image 2' },
    { key: 3, image: ImageProduct3, alt: 'Product Image 3' },
    { key: 4, image: ImageProduct4, alt: 'Product Image 4' }
  ],
  type: [
    { id: 1, label: 'Case' },
    { id: 2, label: 'Tempered Glass' },
    { id: 3, label: 'Charger' }
  ],
  colors: [
    { id: 1, code: '#000000', label: 'Black' },
    { id: 2, code: '#808080', label: 'Grey' },
    { id: 3, code: '#D3D3D3', label: 'lightgrey' }
  ],
  stock: 20,
  store: {
    image: Brand,
    slug: 'zagg-official-store',
    color: '#A91F2E',
    name: 'ZAGG',
    description: 'Premium Phone Protection',
    totalProduct: 110,
    sold: '12.045',
    rating: '5.0',
    review: '10.405'
  },
  description: `
  <p>Thought for a second</p>
  <h2 style="font-size:20px; font-weight:400; letter-spacing: 0.02em;">CASE MAGSAFE FOR IPHONE 16/PRO/PRO MAX ZAGG SNAP CASE CRYSTAL PALACE</h2>
  <p><strong>Original by ZAGG Gear4 Official</strong></p>
  <p>Pasti Ready | Pasti Original 100% | Lifetime Warranty / Seumur Hidup (Rusak Langsung Ganti Baru)</p>
  <p>ZAGG Gear4 merupakan Apple Authorized Partner untuk aksesoris Apple di seluruh dunia dan juga tersedia di modern market seperti iBox, Digimap, iStore, Erafone, dan modern market besar lainnya, yang menjanjikan kualitas terbaik dan fit yang maksimal dari sebuah aksesoris Apple.</p>
  <p>Crystal Palace Snap has a seamless design that shows off the sleek lines of your phone. The case retains its transparent beauty and features an anti-scratch finish. Crystal Palace Snap is fortified with graphene and provides 13 feet of drop protection.
  </p>
  <p><strong>Varian Tipe Handphone:</strong></p>
  <ul>
    <li>iPhone 16</li>
    <li>iPhone 16 Pro</li>
    <li>iPhone 16 Pro Max</li>
  </ul>
  <p><strong>Varian Warna MagSafe:</strong></p>
  <ul>
    <li>Putih</li>
    <li>Hitam</li>
  </ul>
  <p><strong>Tentang ZAGG</strong></p>
  <p>
    ZAGG merupakan brand casing iPhone No. 1 di UK dan sekarang telah merambah secara cepat ke wilayah Amerika karena kualitas dan teknologi terbaik.
  </p>
  <p><strong>GARANSI SEUMUR HIDUP – LANGSUNG TUKAR BARU</strong></p>
  <p><strong>S&amp;K Retur atau Complain:</strong></p>
  <ol>
    <li>Pastikan box dan isi produk masih lengkap dan dalam kondisi baik.</li>
    <li>Siapkan invoice pembelian sebagai bukti transaksi.</li>
    <li>Rekam video unboxing yang jelas.</li>
    <li>Bukan kerusakan yang diakibatkan oleh human error (penggunaan).</li>
  </ol><p>Sebelum membuka produk, rekam video unboxing. Dalam video, pastikan terlihat kondisi awal produk, proses membuka kemasan, kondisi produk setelah dibuka, dan letak permasalahan produk. Jika tidak ada video unboxing, permohonan retur/komplain akan ditolak.</p><div><strong>HARGA SEWAKTU-WAKTU BISA BERUBAH</strong></div>`,
  feature: `<ul><li><p>Crystal Clarity</p><p>The new Crystal Palace Snap has three anti-yellowing technologies to guarantee your case always stays beautifully clear.</p></li><li><p>Drop Resistant up to 13 ft / 4 m</p><p>Crystal Palace Snap has been tested and proven to protect your phone from drops up to 13 feet (4 meters).</p></li><li><p>Strengthened with Graphene</p><p>Graphene is harder than diamond, yet more elastic than rubber, and up to 200× stronger than steel.</p></li><li><p>Sleek, Minimalist Design</p><p>The newly molded design wraps entirely around the edges of the case for a seamless, uninterrupted visual flow.</p></li><li><p>Anti-Scratch Finish</p><p>The anti-scratch coating helps the case maintain its beauty over time.</p></li><li><p>Secure Grip</p><p>The textured edges provide a no-slip grip.</p></li><li><p>Wireless Charging Compatible</p><p>Crystal Palace Snap is MagSafe compatible and works with most wireless chargers.</p></li><li><p>61% Recycled Content</p><p>Crystal Palace Snap is made with up to 61% post-consumer recycled materials.</p></li></ul>`,
  related: [
    {
      id: 1,
      images: Product1,
      name: 'Zagg Case for iPhone 16 - Snap - Crystal Palace',
      slug: 'zagg-case-iphone-16-snap-crystal-palace',
      price: 'Rp549.000',
      rating: '5.0',
      reviewCount: 1289
    },
    {
      id: 2,
      images: Product2,
      name: "iPad 11'' Keyboard - Adam Elements - Matrix 11",
      slug: 'ipad-11-keyboard-adam-elements-matrix-11',
      price: 'Rp3.599.100',
      rating: '5.0',
      reviewCount: 800
    },
    {
      id: 3,
      images: Product3,
      name: 'Data Converter Expand 6 USB-C 6 in 1 - Micropack - Grey',
      slug: 'data-converter-expand-6-usb-c-6-in-1-micropack-grey',
      price: 'Rp799.000',
      oldPrice: 'Rp999.000',
      rating: '5.0',
      reviewCount: 1106
    },
    {
      id: 4,
      images: Product4,
      name: 'Power Bank Wireless Magnetic 10.000 mAh - Basic',
      slug: 'power-bank-wireless-magnetic-10000mah-basic',
      price: 'Rp759.000',
      oldPrice: 'Rp899.000',
      rating: '5.0',
      reviewCount: 745
    }
  ]
};

export default data;
