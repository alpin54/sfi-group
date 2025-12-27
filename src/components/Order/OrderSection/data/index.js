// -- assets
import image from '@assets/image/dummy/product.jpg';
import bca from '@assets/image/icon/payment/bca.svg';
import jne from '@assets/image/icon/shipping/jne.svg';
import logo from '@assets/image/logo/logo-primary.png';

const data = {
  // head
  profile: 'guest',
  title: 'Order Details',
  subtitle: 'Review your items and information',
  // meta
  order_code: 'ORD-00001',
  order_status: 'Shipped',
  order_datetime: '01 Aug 2025, 14.05',
  // list
  list: [
    {
      image: image,
      name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
      selected_variant: {
        name: 'Variant: iPhone 16',
        color: 'Clear'
      },
      quantity: 1,
      price: 549000
    },
    {
      image: image,
      name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
      selected_variant: {
        name: 'Variant: iPhone 16',
        color: 'Black'
      },
      quantity: 2,
      price: 1048000
    },
    {
      image: image,
      name: 'Zagg Case for iPhone 16 – Snap – Crystal Palace',
      selected_variant: {
        name: 'Variant: iPhone 16',
        color: 'Clear'
      },
      quantity: 1,
      price: 549000
    }
  ],
  // subtotal
  subtotal: {
    label: 'Subtotal',
    value: 2146000
  },
  // shipping fee
  shipping_fee: {
    label: 'Shipping Fee',
    value: 20000
  },
  // dealer discount
  discount_dealer: {
    label: 'Discount Dealer',
    value: 100000,
    note: 'New Dealer'
  },
  // general discount
  discount_general: {
    label: 'Discount',
    value: 20000,
    note: 'August Sale'
  },
  // point redemption
  point_redemption: {
    label: 'Points Redeemed',
    value: 10000,
    point: 10
  },
  // total amount
  total_amount: {
    label: 'Total Amount',
    value: 2046000
  },
  // voucher earned dealer
  voucher_earned_dealer: {
    label: 'Voucher Earned',
    value: 200000
  },
  // voucher earned member
  voucher_earned_member: {
    label: 'Points Earned',
    value: '+21'
  },
  // payment method
  payment_method: {
    name: 'Bank BCA',
    icon: bca
  },
  // shipments
  shipments: [
    {
      status: 'Shipped',
      courier: 'JNE',
      courier_icon: jne,
      tracking_number: 'JN0019740649'
    }
  ],
  customer: {
    name: 'Michael Rodri',
    phone: '+62 2122 5711 25',
    province_name: 'West Java',
    city_name: 'Bandung',
    district_name: 'Bandung Wetan',
    village_name: 'Cibeunying Kaler',
    postal_code: '40141',
    address: 'Jl. Setiabudi No. 123'
  },

  shipping_detail: {
    courier: {
      name: 'JNE Express',
      icon: jne
    },
    recipient: {
      label: 'Recipient',
      name: 'Michael Rodri',
      phone: '+62 2122 5711 25'
    },
    delivery_address: {
      label: 'Delivery Address',
      address: 'West Java, Bandung, Bandung Wetan, Cibeunying Kaler, Jl. Setiabudi No. 123, 40141'
    },
    tracking_no: {
      label: 'Tracking No',
      number: 'JN0019740649'
    },
    order_tracking: {
      label: 'Order Tracking',
      list: [
        {
          time: '19.00',
          date: '01 Aug',
          description: 'Order placed',
          name: 'SFI Group',
          logo: logo
        },
        {
          time: '19.00',
          date: '01 Aug',
          description: 'Order placed',
          name: 'SFI Group',
          logo: logo
        }
      ]
    }
  }
};

export default data;
