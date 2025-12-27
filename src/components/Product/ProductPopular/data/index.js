// -- assets
import Product1 from '@assets/image/dummy/product-1.png';
import Product2 from '@assets/image/dummy/product-2.png';
import Product3 from '@assets/image/dummy/product-3.png';
import Product4 from '@assets/image/dummy/product-4.png';

const data = {
  title: 'Top Picks Loved by Everyone',
  list: [
    {
      id: 'p-001',
      images: Product1,
      name: 'Zagg Case for iPhone 16 - Snap - Crystal Palace',
      slug: 'zagg-case-iphone-16-snap-crystal-palace',
      price: 'Rp549.000',
      rating: '5.0',
      reviewCount: 1289,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 'p-002',
      images: Product2,
      name: "iPad 11'' Keyboard - Adam Elements - Matrix 11",
      slug: 'ipad-11-keyboard-adam-elements-matrix-11',
      price: 'Rp3.599.100',
      rating: '5.0',
      reviewCount: 800,
      promotions: [
        { id: 1, title: 'Sale' },
        { id: 2, title: 'Buy 1 Get 1' }
      ]
    },
    {
      id: 'p-003',
      images: Product3,
      name: 'Data Converter Expand 6 USB-C 6 in 1 - Micropack - Grey',
      slug: 'data-converter-expand-6-usb-c-6-in-1-micropack-grey',
      price: 'Rp799.000',
      oldPrice: 'Rp999.000',
      rating: '5.0',
      reviewCount: 1106,
      promotions: [{ id: 1, title: 'Building' }]
    },
    {
      id: 'p-004',
      images: Product4,
      name: 'Power Bank Wireless Magnetic 10.000 mAh - Basic',
      slug: 'power-bank-wireless-magnetic-10000mah-basic',
      price: 'Rp759.000',
      oldPrice: 'Rp899.000',
      rating: '5.0',
      reviewCount: 745,
      promotions: []
    }
  ]
};

export default data;
