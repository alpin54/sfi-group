const data = {
  role: 'member',
  dealer_name: 'SFI Official Dealer',
  dealer_identity: 'https://example.com/path/to/dealer_identity_image.jpg',
  dealer_tax: 'https://example.com/path/to/dealer_identity_image.jpg',
  name: 'Jhon Doe',
  email: 'jhondoe@example.com',
  phone: '081234567890',
  date_of_birth: '1996-03-03T00:00:00.000Z',
  gender: 'Male',
  province_name: 'DKI Jakarta',
  city_name: 'Jakarta Selatan',
  district_name: 'Kebayoran Baru',
  sub_district_name: 'Gandaria Selatan',
  postal_code: '12140',
  address: '123 Main St, Jakarta, Indonesia',
  created_at: '2022-01-15T08:30:00.000Z',
  updated_at: '2024-03-01T12:00:00.000Z',
  voucher: {
    total: 120,
    valid_from: '2025-12-01T00:00:00.000Z',
    valid_until: '2025-12-31T23:59:59.000Z',
    items: [
      {
        id: 1,
        name: 'Active',
        list: [
          {
            id: 1,
            name: 'New Dealer Gets Rp100,000 Off',
            total: 50000,
            valid_from: '2025-12-01T00:00:00.000Z',
            valid_until: '2025-12-31T23:59:59.000Z'
          },
          {
            id: 2,
            name: 'Holiday Special Voucher',
            total: 70000,
            valid_from: '2025-12-01T00:00:00.000Z',
            valid_until: '2025-12-31T23:59:59.000Z'
          }
        ]
      },
      {
        id: 2,
        name: 'Used',
        list: [
          {
            id: 1,
            name: 'New Dealer Gets Rp100,000 Off',
            total: 50000,
            valid_from: '2025-12-01T00:00:00.000Z',
            valid_until: '2025-12-31T23:59:59.000Z',
            used: {
              quantity: 1,
              order_code: 'ODR-20240115-002',
              created_at: '2025-12-20T23:59:59.000Z'
            }
          },
          {
            id: 2,
            name: 'Holiday Special Voucher',
            total: 70000,
            valid_from: '2025-12-01T00:00:00.000Z',
            valid_until: '2025-12-31T23:59:59.000Z',
            used: {
              quantity: 1,
              order_code: 'ODR-20240115-002',
              created_at: '2025-12-20T23:59:59.000Z'
            }
          }
        ]
      },
      {
        id: 3,
        name: 'Expired',
        list: [
          {
            id: 1,
            name: 'New Dealer Gets Rp100,000 Off',
            total: 30000,
            valid_from: '2025-12-01T00:00:00.000Z',
            valid_until: '2025-12-20T23:59:59.000Z'
          }
        ]
      },
      {
        id: 4,
        name: 'Achievable',
        list: [
          {
            id: 1,
            name: 'Refer a Friend Voucher',
            total: 50000,
            note: 'Refer 3 friends to get this voucher.'
          }
        ]
      }
    ]
  },
  points_balance: {
    total: 120,
    value: 120000
  },
  points_history: [
    {
      id: 1,
      name: 'Earning',
      list: [
        {
          id: 1,
          date: '2024-01-10',
          name: null,
          order: {
            id: 101,
            order_code: 'ORD-20240110-001',
            quantity: 2
          },
          point: '+50'
        },
        {
          id: 2,
          date: '2024-01-15',
          name: null,
          order: {
            id: 102,
            order_code: 'ORD-20240115-002',
            quantity: 1
          },
          point: '+30'
        },
        {
          id: 3,
          date: '2024-01-20',
          name: null,
          order: {
            id: 103,
            order_code: 'ORD-20240120-003',
            quantity: 3
          },
          point: '+40'
        },
        {
          id: 4,
          date: '2024-02-05',
          name: null,
          order: {
            id: 104,
            order_code: 'ORD-20240205-004',
            quantity: 1
          },
          point: '+20'
        }
      ]
    },
    {
      id: 2,
      name: 'Spending',
      list: [
        {
          id: 5,
          date: '2024-02-10',
          name: 'Redeemed for Discount Voucher',
          order: null,
          point: '-60'
        },
        {
          id: 6,
          date: '2024-03-01',
          name: 'Redeemed for Gift Item',
          order: null,
          point: '-40'
        }
      ]
    }
  ]
};

export default data;
