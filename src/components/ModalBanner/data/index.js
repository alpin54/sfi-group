// -- assets
import ModalBannerImage from '@assets/image/dummy/modal-banner.png';

const data = {
  list: [
    {
      id: 'm-001',
      title: "Don't Miss Out!",
      subtitle: 'Nearly Unlocked Reward!',
      description:
        'Be a Member to earn 50 points for rewards, or become a Dealer to get Rp200.000 vouchers and special perks.',
      url: '/',
      image: ModalBannerImage,
      button_text: "Let's Go!",
      button_url: '/promo'
    },
    {
      id: 'm-002',
      title: 'Special Year End Offer',
      subtitle: 'Exclusive for members',
      description: 'Get extra cashback and free shipping for orders above Rp500.000. Valid until end of month.',
      url: '/promo/year-end',
      image: ModalBannerImage,
      button_text: 'Shop Now',
      button_url: '/catalog'
    },
    {
      id: 'm-003',
      title: 'New Arrivals',
      subtitle: null,
      description: 'Check our latest collection with introductory discounts.',
      url: '/new',
      image: ModalBannerImage,
      button_text: 'See Collection',
      button_url: '/collection/new'
    }
  ]
};

export default data;
