import AccountDefault from '@assets/image/illustration/account.png';
import Product1 from '@assets/image/dummy/product-1.png';
import Product2 from '@assets/image/dummy/product-2.png';
import Product3 from '@assets/image/dummy/product-3.png';
import Product4 from '@assets/image/dummy/product-4.png';

const data = {
  ratings: [
    {
      id: 5,
      review: '500 reviews',
      stars: 5
    },
    {
      id: 4,
      review: '200 reviews',
      stars: 4
    },
    {
      id: 3,
      review: '100 reviews',
      stars: 3
    },
    {
      id: 2,
      review: '50 reviews',
      stars: 2
    },
    {
      id: 1,
      review: '25 reviews',
      stars: 1
    }
  ],
  data: [
    {
      id: 1,
      image: AccountDefault,
      name: 'John Doe',
      date: 'June 10, 2024',
      stars: 5,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 2,
        name: 'Red'
      },
      comment: 'Great product! Highly recommend it.',
      images: [Product1, Product2]
    },
    {
      id: 2,
      image: AccountDefault,
      name: 'Jane Smith',
      date: 'June 9, 2024',
      stars: 4,
      type: {
        id: 2,
        name: 'Premium'
      },
      color: {
        id: 1,
        name: 'Blue'
      },
      comment: 'Good quality, but delivery was a bit slow.',
      images: [Product3]
    },
    {
      id: 3,
      image: AccountDefault,
      name: 'Michael Johnson',
      date: 'June 8, 2024',
      stars: 5,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 3,
        name: 'Green'
      },
      comment: 'Exceeded my expectations!',
      images: []
    },
    {
      id: 4,
      image: AccountDefault,
      name: 'Emily Davis',
      date: 'June 7, 2024',
      stars: 3,
      type: {
        id: 2,
        name: 'Premium'
      },
      color: {
        id: 2,
        name: 'Red'
      },
      comment: 'Average product, nothing special.',
      images: [Product2]
    },
    {
      id: 5,
      image: AccountDefault,
      name: 'William Brown',
      date: 'June 6, 2024',
      stars: 2,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 1,
        name: 'Blue'
      },
      comment: 'Not satisfied with the quality.',
      images: []
    },
    {
      id: 6,
      image: AccountDefault,
      name: 'Olivia Wilson',
      date: 'June 5, 2024',
      stars: 4,
      type: {
        id: 2,
        name: 'Premium'
      },
      color: {
        id: 3,
        name: 'Green'
      },
      comment: 'Nice design and works well.',
      images: [Product4]
    },
    {
      id: 7,
      image: AccountDefault,
      name: 'James Miller',
      date: 'June 4, 2024',
      stars: 5,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 2,
        name: 'Red'
      },
      comment: 'Fantastic! Will buy again.',
      images: [Product1, Product3]
    },
    {
      id: 8,
      image: AccountDefault,
      name: 'Sophia Martinez',
      date: 'June 3, 2024',
      stars: 1,
      type: {
        id: 2,
        name: 'Premium'
      },
      color: {
        id: 1,
        name: 'Blue'
      },
      comment: 'Very disappointed. Would not recommend.',
      images: []
    },
    {
      id: 9,
      image: AccountDefault,
      name: 'Benjamin Anderson',
      date: 'June 2, 2024',
      stars: 3,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 3,
        name: 'Green'
      },
      comment: 'It’s okay for the price.',
      images: [Product2, Product4]
    },
    {
      id: 10,
      image: AccountDefault,
      name: 'Charlotte Thomas',
      date: 'June 1, 2024',
      stars: 4,
      type: {
        id: 2,
        name: 'Premium'
      },
      color: {
        id: 2,
        name: 'Red'
      },
      comment: 'Pretty good overall.',
      images: []
    },
    {
      id: 11,
      image: AccountDefault,
      name: 'Daniel Lee',
      date: 'May 31, 2024',
      stars: 5,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 1,
        name: 'Blue'
      },
      comment: 'Absolutely love it!',
      images: [Product1]
    },
    {
      id: 12,
      image: AccountDefault,
      name: 'Amelia Harris',
      date: 'May 30, 2024',
      stars: 2,
      type: {
        id: 2,
        name: 'Premium'
      },
      color: {
        id: 3,
        name: 'Green'
      },
      comment: 'Not as described.',
      images: []
    },
    {
      id: 13,
      image: AccountDefault,
      name: 'Matthew Clark',
      date: 'May 29, 2024',
      stars: 3,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 2,
        name: 'Red'
      },
      comment: 'Decent, but could be better.',
      images: [Product3]
    },
    {
      id: 14,
      image: AccountDefault,
      name: 'Mia Lewis',
      date: 'May 28, 2024',
      stars: 4,
      type: {
        id: 2,
        name: 'Premium'
      },
      color: {
        id: 1,
        name: 'Blue'
      },
      comment: 'Happy with my purchase.',
      images: [Product2]
    },
    {
      id: 15,
      image: AccountDefault,
      name: 'Elijah Walker',
      date: 'May 27, 2024',
      stars: 5,
      type: {
        id: 1,
        name: 'Standard'
      },
      color: {
        id: 3,
        name: 'Green'
      },
      comment: 'Top-notch product!',
      images: [Product4, Product1]
    }
  ],
  total: 15,
  limit: 5
};

export default data;
