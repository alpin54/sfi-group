// -- assets
import ModalBannerImage from '@assets/image/dummy/modal-banner.png';

const data = {
  list: [
    {
      id: 1,
      title: "Don't Miss Out!",
      subtitle: 'Nearly Unlocked Reward!',
      description:
        'Be a Member to earn 50 points for rewards, or become a Dealer to get Rp200.000 vouchers and special perks.',
      url: '/promo',
      image: ModalBannerImage,
      button_text: "Let's Go!",
      button_url: '/promo'
    },
    {
      id: 2,
      title: 'Special Year End Offer',
      subtitle: 'Exclusive for members',
      description: 'Get extra cashback and free shipping for orders above Rp500.000. Valid until end of month.',
      url: '/promo',
      image: ModalBannerImage,
      button_text: 'Shop Now',
      button_url: '/promo'
    },
    {
      id: 3,
      title: 'New Arrivals',
      subtitle: null,
      description: 'Check our latest collection with introductory discounts.',
      url: '/shop/new-arrivals',
      image: ModalBannerImage,
      button_text: 'See Collection',
      button_url: '/shop/new-arrivals'
    }
  ]
};

export default data;
