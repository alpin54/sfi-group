// assets
import FaqEmpty from '@assets/image/dummy/faqs-empty.svg';

const data = {
  title: 'Frequently Asked Questions',
  description: 'Find quick answers to common questions about our services, policies, and processes all in one place.',
  list: [
    {
      id: 1,
      title: 'How do I place an order?',
      type: 'FAQ',
      description: 'Select your desired product, add it to the cart, and proceed to Checkout to complete the payment.',
      open: true
    },
    {
      id: 2,
      title: 'Is there a minimum order requirement?',
      type: 'FAQ',
      description: 'Some products require a minimum quantity — check the product page for specific requirements.'
    },
    {
      id: 3,
      title: 'How can I check my order status?',
      type: 'FAQ',
      description:
        'Log into your account and visit the "Order History" or "My Orders" section to see the latest updates.'
    },
    {
      id: 4,
      title: 'What payment methods are available?',
      type: 'FAQ',
      description:
        'We accept major credit/debit cards, bank transfers, and PayPal. Additional local methods may be available at checkout.'
    },
    {
      id: 5,
      title: 'Why did my payment fail?',
      type: 'FAQ',
      description:
        'Payment can fail due to incorrect card details, insufficient funds, or bank/security blocks. Try again or contact your bank.'
    },
    {
      id: 6,
      title: 'How do I use a promo code?',
      type: 'FAQ',
      description:
        'Enter the promo code in the “Promo / Discount” field at checkout and click "Apply" before completing payment.'
    },
    {
      id: 7,
      title: 'Can I change or cancel my order?',
      type: 'FAQ',
      description:
        'If the order hasn’t shipped yet, you can request a change or cancellation via your account or by contacting support.'
    },
    {
      id: 8,
      title: 'How long does delivery take?',
      type: 'FAQ',
      description:
        'Delivery times depend on the shipping option and destination — typical delivery ranges are shown on the product/checkout pages.'
    }
  ],
  empty: {
    img: FaqEmpty,
    title: 'Oops, no questions here yet.',
    description: 'Be the first to explore our FAQs!'
  }
};
export default data;
