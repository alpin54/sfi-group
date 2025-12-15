// -- assets
import Earphone from '@assets/image/dummy/earphone.png';
import Headset from '@assets/image/dummy/headset.jpg';
import BgCard from '@assets/image/dummy/bg-card-higlight.png';
import BgCard2 from '@assets/image/dummy/bg-card-higlight2.png';
import BgCard3 from '@assets/image/dummy/bg-card-higlight3.jpg';

const data = {
  url: '#',
  title: 'Hurry, only 2 left in stock!',
  description: 'Don’t miss out—grab yours before it’s gone!',
  image: Earphone,
  button_url: '#shop',
  button_text: 'Shop Now',
  button_secondary_url: '#learn',
  button_secondary_text: 'Learn More',
  list: [
    {
      url: '#',
      title: 'Complete Gadget Accessories for All Your Devices',
      image: BgCard,
      button_url: '#explore-gadgets',
      button_text: 'Explore Gadgets'
    },
    {
      url: '#',
      title: 'Clear Sound, Maximum Quality Performance',
      image: Headset,
      button_url: '#explore-audio',
      button_text: 'Explore Audio'
    },
    {
      url: '#',
      title: 'Maximum Performance, Unlimited Productivity',
      image: BgCard3,
      button_url: '#explore-it',
      button_text: 'Explore IT'
    },
    {
      url: '#',
      title: 'Quality Chargers for Every Device',
      image: BgCard2,
      button_url: '#explore-bags',
      button_text: 'Explore Bags'
    }
  ]
};

export default data;
