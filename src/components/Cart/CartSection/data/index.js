// -- assets
import Product1 from '@assets/image/dummy/product-1.png';
import Product2 from '@assets/image/dummy/product-2.png';
import Product3 from '@assets/image/dummy/product-3.png';
import Product4 from '@assets/image/dummy/product-4.png';

const data = {
  data: [
    {
      id: 1,
      image: Product1,
      name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
      stock: 120,
      quantity: 2,
      price: 300000,
      sale_price: 250000,
      variants: [
        { id: 11, name: 'iPhone 6', stock: 50, price: 250000, sale_price: 200000 },
        { id: 12, name: 'iPhone 16', stock: 70, price: 300000, sale_price: 250000 }
      ],
      selected_variant: {
        id: 11,
        name: 'iPhone 6',
        stock: 50,
        price: 250000,
        sale_price: 200000
      }
    },
    {
      id: 2,
      image: Product1,
      name: 'Zagg Case for iPhone 13 – Snap – Crystal Palace',
      stock: 120,
      quantity: 2,
      price: 300000,
      sale_price: 250000,
      variants: [
        { id: 8, name: 'iPhone 8', stock: 50, price: 250000, sale_price: 200000 },
        { id: 9, name: 'iPhone 13', stock: 70, price: 300000, sale_price: 250000 }
      ],
      selected_variant: {
        id: 8,
        name: 'iPhone 8',
        stock: 50,
        price: 250000,
        sale_price: 200000
      }
    }
  ],
  recommended: [
    {
      id: 1,
      images: Product1,
      name: 'Zagg Case for iPhone 16 - Snap - Crystal Palace',
      slug: 'zagg-case-iphone-16-snap-crystal-palace',
      price: 'Rp549.000',
      rating: '5.0',
      reviewCount: 1289,
      favorite: true,
      promotions: [
        { id: 1, title: 'Sale' },
        { id: 2, title: 'Buy 1 Get 1' }
      ]
    },
    {
      id: 2,
      images: Product2,
      name: "iPad 11'' Keyboard - Adam Elements - Matrix 11",
      slug: 'ipad-11-keyboard-adam-elements-matrix-11',
      price: 'Rp3.599.100',
      rating: '5.0',
      reviewCount: 800,
      favorite: true,
      promotions: [
        { id: 1, title: 'Sale' },
        { id: 2, title: 'Building' }
      ]
    },
    {
      id: 3,
      images: Product3,
      name: 'Data Converter Expand 6 USB-C 6 in 1 - Micropack - Grey',
      slug: 'data-converter-expand-6-usb-c-6-in-1-micropack-grey',
      price: 'Rp799.000',
      oldPrice: 'Rp999.000',
      rating: '5.0',
      reviewCount: 1106,
      favorite: true,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 4,
      images: Product4,
      name: 'Power Bank Wireless Magnetic 10.000 mAh - Basic',
      slug: 'power-bank-wireless-magnetic-10000mah-basic',
      price: 'Rp759.000',
      oldPrice: 'Rp899.000',
      rating: '5.0',
      reviewCount: 745,
      favorite: true,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 5,
      images: Product1,
      name: 'Wireless Earbuds - Soundcore Liberty Air 2',
      slug: 'wireless-earbuds-soundcore-liberty-air-2',
      price: 'Rp1.299.000',
      rating: '4.8',
      reviewCount: 950,
      favorite: true,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 6,
      images: Product2,
      name: 'Bluetooth Speaker - JBL Go 3',
      slug: 'bluetooth-speaker-jbl-go-3',
      price: 'Rp499.000',
      rating: '4.9',
      reviewCount: 1200,
      favorite: true,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 7,
      images: Product3,
      name: 'Smart Watch - Xiaomi Mi Band 7',
      slug: 'smart-watch-xiaomi-mi-band-7',
      price: 'Rp699.000',
      rating: '4.7',
      reviewCount: 850,
      favorite: true,
      promotions: [{ id: 1, title: 'Sale' }]
    },
    {
      id: 8,
      images: Product4,
      name: 'Portable SSD 1TB - Samsung T7',
      slug: 'portable-ssd-1tb-samsung-t7',
      price: 'Rp1.899.000',
      oldPrice: 'Rp2.199.000',
      rating: '4.9',
      reviewCount: 670,
      favorite: true,
      promotions: [{ id: 1, title: 'Sale' }]
    }
  ]
};

export default data;
