const data = {
  data: {
    title: 'How Can We Help?',

    // FORM AGREEMENT
    agreement: {
      terms_url: '/terms',
      privacy_url: '/privacy'
    },

    // RIGHT SIDE CONTENT
    right: {
      visit: {
        title: 'Visit Us',
        address: 'Jl. Mampang Raya, Rukan Exclusive D23, Bukit Golf Mediterania, Pluit, Jakarta 14470',
        link: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.635929417972!2d106.79256497498454!3d-6.176068360495154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d62e8e1c5ef%3A0x1dfcba612e3a92d4!2sPluit%20Village!5e0!3m2!1sen!2sid!4v1700000000000'
      },

      contacts: [
        { label: 'Phone', value: '081234567890' },
        { label: 'WhatsApp', value: '081234567890' },
        { label: 'Email', value: 'hello@bilikmedia.com' }
      ],

      socials: {
        title: 'Stay Connected',
        list: [
          { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
          { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
          { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
          { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' }
        ]
      },

      marketplace: {
        title: 'Find Us Online',
        list: [
          {
            name: 'Shopee',
            url: 'https://shopee.co.id',
            icon: 'shopee'
          },
          {
            name: 'Tokopedia',
            url: 'https://tokopedia.com',
            icon: 'tokopedia'
          }
        ]
      }
    }
  }
};

export default data;
