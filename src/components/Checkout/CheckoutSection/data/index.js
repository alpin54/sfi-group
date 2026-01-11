// -- assets
import image from '@assets/image/dummy/product.jpg';
import jne from '@assets/image/icon/shipping/jne.svg';
import jnt from '@assets/image/icon/shipping/j&t-express.svg';
import ninja from '@assets/image/icon/shipping/ninja-xpress.svg';
import success from '@assets/image/illustration/success.svg';

const data = {
  // head
  profile: 'guest', // dealer | member | guest
  title: 'Complete Your Purchase',
  subtitle: 'Review your order before payment.',
  // address
  address: {
    title: 'Delivery Address'
  },
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
    value: 0
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
    label: 'Total',
    value: 2146000
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
  // shipments
  shipments: [
    {
      courier: 'JNE',
      courier_icon: jne,
      price: 20000,
      etd: '3 - 4 Days'
    },
    {
      courier: 'J&T',
      courier_icon: jnt,
      price: 20000,
      etd: '3 - 4 Days'
    },
    {
      courier: 'Ninja',
      courier_icon: ninja,
      price: 20000,
      etd: '3 - 4 Days'
    }
  ],
  // success
  success: {
    image: success,
    title: 'Order Successful!',
    description: 'Your order has been placed successfully.'
  }
};

export default data;
