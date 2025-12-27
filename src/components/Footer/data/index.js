// components/Footer/data.js

const data = {
  status: 'success',
  data: {
    company_name: 'SFI Group',
    copyright: '© 2025 • SFI Group',
    language_selector: {
      current: 'EN',
      available: ['ID', 'EN']
    },

    menu: [
      {
        title: 'Explore Our Products',
        type: 'menu', // normal menu (akan jadi accordion)
        links: [
          { name: 'Gadget', url: '/products/gadget' },
          { name: 'Computer', url: '/products/computer' },
          { name: 'Charger', url: '/products/charger' },
          { name: 'Audio', url: '/products/audio' },
          { name: 'Bags', url: '/products/bags' },
          { name: 'Lifestyle', url: '/products/lifestyle' },
          { name: 'Health', url: '/products/health' },
          { name: 'Others', url: '/products/others' }
        ]
      },

      {
        title: 'Get to Know Us',
        type: 'menu',
        links: [
          { name: 'About Us', url: '/about-us' },
          { name: 'Contact Us', url: '/contact-us' },
          { name: 'Careers', url: '/career' },
          { name: 'FAQ', url: '/faqs' }
        ]
      },

      {
        title: 'Legal & Policy',
        type: 'menu',
        links: [
          { name: 'Terms & Conditions', url: '/terms-conditions' },
          { name: 'Privacy Policy', url: '/privacy-policy' }
        ]
      },

      {
        title: 'Partner With Us',
        type: 'menu',
        links: [
          { name: 'Join Member', url: '/sign-in' },
          { name: 'Join Dealer', url: '#' },
          { name: 'Reward & Benefit', url: '/reward-benefit' }
        ]
      },

      {
        title: 'Need Help?',
        type: 'menu',
        links: [
          { name: 'Shipping Information', url: '/shipping-information' },
          { name: 'Return & Refund Policy', url: '/return-refund' }
        ]
      },

      // ======================================================
      //  Special layout section (Let’s Talk)
      //  beda struktur, beda slicing, beda tampilan
      // ======================================================
      {
        title: 'Let’s Talk',
        type: 'contact', // penanda: beda layout
        links: [
          {
            name: '+62 2122 5711 25',
            label: 'Office',
            url: 'tel:+622122571125',
            type: 'phone',
            icon: 'phone-fill'
          },
          {
            name: '+62 8581 1602 018',
            label: 'Mobile',
            url: 'https://wa.me/6285811602018',
            type: 'phone',
            icon: 'whatsapp-fill'
          },
          {
            name: 'info@sfgroup.co.id',
            url: 'mailto:info@sfgroup.co.id',
            type: 'email',
            icon: 'email-fill'
          }
        ]
      },

      // ======================================================
      //  Stay Connected — icon social media
      // ======================================================
      {
        title: 'Stay Connected',
        type: 'social',
        links: [
          { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
          { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
          { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
          { name: 'Twitter', url: 'https://twitter.com', icon: 'x-logo' }
        ]
      },

      // ======================================================
      //  Find Us Online — marketplace icon
      // ======================================================
      {
        title: 'Find Us Online',
        type: 'marketplace',
        links: [
          { name: 'Shopee', url: 'https://shopee.com', icon: 'shopee' },
          { name: 'Tokopedia', url: 'https://tokopedia.com', icon: 'tokopedia' }
        ]
      }
    ]
  }
};

export default data;
