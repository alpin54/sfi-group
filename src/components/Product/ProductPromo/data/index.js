// -- assets
import Product1 from '@assets/image/dummy/product-1.png';
import Product2 from '@assets/image/dummy/product-2.png';
import Product3 from '@assets/image/dummy/product-3.png';
import Product4 from '@assets/image/dummy/product-4.png';
import Brand1 from '@assets/image/dummy/logo-adam.png';
import Brand2 from '@assets/image/dummy/logo-avana.png';
import Brand3 from '@assets/image/dummy/logo-itskins.png';
import Brand4 from '@assets/image/dummy/logo-micropack.png';
import Brand5 from '@assets/image/dummy/logo-mophie.png';
import Brand6 from '@assets/image/dummy/logo-paperlike.png';
import Brand7 from '@assets/image/dummy/logo-uag.png';
import Brand8 from '@assets/image/dummy/logo-verbatim.png';
import Brand9 from '@assets/image/dummy/logo-zagg.jpg';

const data = {
  title: 'Time to Shop Promo Products',
  subtitle:
    'Explore a collection of products with big discounts and special offers.Get the best deals on our promo products. Limited time offer!',
  data: [
    {
      id: 'p-001',
      images: Product1,
      name: 'Zagg Case for iPhone 16 - Snap - Crystal Palace',
      url: '/product/p-001',
      price: 'Rp549.000',
      rating: '5.0',
      reviewCount: 1289,
      // favorite: true,
      promotions: [
        { id: 1, title: 'Sale' },
        { id: 2, title: 'Buy 1 Get 1' }
      ]
    },
    {
      id: 'p-002',
      images: Product2,
      name: "iPad 11'' Keyboard - Adam Elements - Matrix 11",
      url: '/product/p-002',
      price: 'Rp3.599.100',
      rating: '5.0',
      reviewCount: 800,
      promotions: [
        { id: 1, title: 'Sale' },
        { id: 2, title: 'Building' }
      ]
    },
    {
      id: 'p-003',
      images: Product3,
      name: 'Data Converter Expand 6 USB-C 6 in 1 - Micropack - Grey',
      url: '/product/p-003',
      price: 'Rp799.000',
      oldPrice: 'Rp999.000',
      rating: '5.0',
      reviewCount: 1106,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-004',
      images: Product4,
      name: 'Power Bank Wireless Magnetic 10.000 mAh - Basic',
      url: '/product/p-004',
      price: 'Rp759.000',
      oldPrice: 'Rp899.000',
      rating: '5.0',
      reviewCount: 745,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-005',
      images: Product1,
      name: 'Wireless Earbuds - Soundcore Liberty Air 2',
      url: '/product/p-005',
      price: 'Rp1.299.000',
      rating: '4.8',
      reviewCount: 950,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-006',
      images: Product2,
      name: 'Bluetooth Speaker - JBL Go 3',
      url: '/product/p-006',
      price: 'Rp499.000',
      rating: '4.9',
      reviewCount: 1200,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-007',
      images: Product3,
      name: 'Smart Watch - Xiaomi Mi Band 7',
      url: '/product/p-007',
      price: 'Rp699.000',
      rating: '4.7',
      reviewCount: 850,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-008',
      images: Product4,
      name: 'Portable SSD 1TB - Samsung T7',
      url: '/product/p-008',
      price: 'Rp1.899.000',
      oldPrice: 'Rp2.199.000',
      rating: '4.9',
      reviewCount: 670,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-009',
      images: Product1,
      name: 'Gaming Mouse - Logitech G102',
      url: '/product/p-009',
      price: 'Rp299.000',
      rating: '4.8',
      reviewCount: 1100,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-010',
      images: Product2,
      name: 'Mechanical Keyboard - Keychron K2',
      url: '/product/p-010',
      price: 'Rp1.099.000',
      rating: '4.9',
      reviewCount: 980,
      promotions: [{ id: 1, title: 'Sale' }]
    }
  ],
  meta: {
    total: 10,
    page: 1,
    limit: 12,
    totalPages: 1
  },
  brandOptions: [
    { value: 1, label: 'Brand 1', image: Brand1.src },
    { value: 2, label: 'Brand 2', image: Brand2.src },
    { value: 3, label: 'Brand 3', image: Brand3.src },
    { value: 4, label: 'Brand 4', image: Brand4.src },
    { value: 5, label: 'Brand 5', image: Brand5.src },
    { value: 6, label: 'Brand 6', image: Brand6.src },
    { value: 7, label: 'Brand 7', image: Brand7.src },
    { value: 8, label: 'Brand 8', image: Brand8.src },
    { value: 9, label: 'Brand 9', image: Brand9.src }
  ],
  sortOptions: [
    { value: 'newest', label: 'Newest' },
    { value: 'biggest_discount', label: 'Biggest Discount' },
    { value: 'best_selling', label: 'Best Selling' },
    { value: 'price_asc', label: 'Lowest Price' },
    { value: 'price_desc', label: 'Highest Price' }
  ],
  colorOptions: [
    { value: 1, label: 'White' },
    { value: 2, label: 'Black' },
    { value: 3, label: 'Red' },
    { value: 4, label: 'Yellow' },
    { value: 5, label: 'Blue' }
  ]
};

export default data;
