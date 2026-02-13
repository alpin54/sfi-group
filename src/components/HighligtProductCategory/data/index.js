// -- assets
import HighlightImage1 from '@assets/image/dummy/highlight-1.jpg';
import HighlightImage2 from '@assets/image/dummy/highlight-2.jpg';
import HighlightImage3 from '@assets/image/dummy/highlight-3.jpg';
import HighlightImage4 from '@assets/image/dummy/highlight-4.jpg';
import HighlightImage5 from '@assets/image/dummy/highlight-5.jpg';

const data = {
  url: '/shop/earphones',
  title: 'Hurry, only 2 left in stock!',
  description: 'Don’t miss out—grab yours before it’s gone!',
  image: HighlightImage1,
  button_url: '/shop/earphones',
  button_text: 'Shop Now',
  button_secondary_url: '/shop/earphones',
  button_secondary_text: 'Learn More',
  list: [
    {
      url: '/shop/gadgets',
      title: 'Complete Gadget Accessories for All Your Devices',
      image: HighlightImage2,
      button_url: '/shop/gadgets',
      button_text: 'Explore Gadgets'
    },
    {
      url: '/shop/audio',
      title: 'Clear Sound, Maximum Quality Performance',
      image: HighlightImage3,
      button_url: '/shop/audio',
      button_text: 'Explore Audio'
    },
    {
      url: '/shop/it',
      title: 'Maximum Performance, Unlimited Productivity',
      image: HighlightImage4,
      button_url: '/shop/it',
      button_text: 'Explore IT'
    },
    {
      url: '/shop/chargers',
      title: 'Quality Chargers for Every Device',
      image: HighlightImage5,
      button_url: '/shop/chargers',
      button_text: 'Explore Chargers'
    }
  ]
};

export default data;
