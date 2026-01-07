// -- assets
import ImageProduct1 from '@assets/image/dummy/order-1.png';
import ImageProduct2 from '@assets/image/dummy/order-1.png';
import ImageProduct3 from '@assets/image/dummy/order-1.png';

const data = [
  {
    id: 'ORD00123',
    status: 'PENDING',
    order_code: 'ORD-00001',
    created_at: '12 Aug 2025, 10:00 AM',
    countdown: '01:59:59',
    date: '10:00, 16 Aug 2025',
    points_earned: 150,
    items: [
      {
        id: 1,
        name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
        image: ImageProduct1,
        price: 450000,
        variant: { material_name: 'Clear' },
        qty: 1
      },
      {
        id: 2,
        name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
        image: ImageProduct1,
        price: 450000,
        variant: { material_name: 'Clear' },
        qty: 1
      }
    ],
    total_amount: 1320000,
    moreProduct: true
  },
  {
    id: 'ORD00123',
    status: 'SHIPPED',
    order_code: 'ORD-00001',
    created_at: '12 Aug 2025, 10:00 AM',
    date: '10:00, 16 Aug 2025',
    points_earned: 150,
    items: [
      {
        id: 1,
        name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace ',
        image: ImageProduct2,
        price: 450000,
        variant: { material_name: 'Clear' },
        qty: 1
      }
    ],
    total_amount: 1320000,
    moreProduct: true
  },
  {
    id: 'ORD00123',
    status: 'DELIVERED',
    order_code: 'ORD-00001',
    created_at: '12 Aug 2025, 10:00 AM',
    date: '10:00, 16 Aug 2025',
    points_earned: 150,
    items: [
      {
        id: 1,
        name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
        image: ImageProduct3,
        price: 450000,
        variant: { material_name: 'Clear' },
        qty: 1
      },
      {
        id: 2,
        name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
        image: ImageProduct1,
        price: 450000,
        variant: { material_name: 'Clear' },
        qty: 2
      }
    ],
    total_amount: 1320000,
    moreProduct: true
  }
];

export default data;
